using System.Collections.Immutable;
using Backend.Core;
using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Requests.Commands;
using Backend.Responses;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Point = NetTopologySuite.Geometries.Point;

namespace Backend.Services;

public class MeetingService : IMeetingService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IPictureService _pictureService;
    private readonly ICurrentUserService _currentUserService;
    private readonly INoteService _noteService;

    public MeetingService(
        ApplicationDbContext dbContext,
        IPictureService pictureService,
        ICurrentUserService currentUserService,
        INoteService noteService)
    {
        _dbContext = dbContext;
        _pictureService = pictureService;
        _currentUserService = currentUserService;
        _noteService = noteService;
    }

    public async Task<int> Create(CreateMeetingDto request)
    {
        var address = await _dbContext.Addresses.SingleOrDefaultAsync(a => a.PlaceId == request.Address.PlaceId);
        var user = await _dbContext.Users.SingleAsync(u => u.Id == _currentUserService.UserId);

        var meeting = request.ToMeeting();
        if (address is null)
        {
            var newAddress = new Address
            {
                PlaceId = request.Address.PlaceId,
                City = request.Address.City,
                Location = new Point(request.Address.Longitude, request.Address.Latitude),
                PlaceName = request.Address.PlaceName,
                PlaceUrl = request.Address.PlaceUrl,
                StreetNumber = request.Address.StreetNumber,
                StreetName = request.Address.StreetName
            };

            await _dbContext.Addresses.AddAsync(newAddress);
            meeting.Location = newAddress;
        }
        else
        {
            meeting.PlaceId = address.PlaceId;
        }

        meeting.Organizer = user;

        await _dbContext.Meetings.AddAsync(meeting);
        await _dbContext.SaveChangesAsync();
        await _pictureService.Add(user.Id, meeting.Id, request.PictureBase64);
        meeting.Participants.Add(new UserMeeting(user, meeting)); //Organizator jako uczestnik spotkania
        await _dbContext.SaveChangesAsync();

        return meeting.Id;
    }

    public async Task<ParticipationDto?> MarkParticipation(int id)
    {
        var meeting = await _dbContext.Meetings
                          .Include(m => m.Participants)
                          .SingleOrDefaultAsync(m =>
                              m.Id == id && m.End >= DateTimeOffset.UtcNow) //brak możliwości uczestnictwa w zakończonym treningu
                      ?? throw new ArgumentException("Could not find the meeting", nameof(id));

        var user = await _dbContext.Users
            .Include(u => u.FollowedOrParticipatedInMeetings)
            .Include(u => u.OrganizedMeetings)
            .SingleAsync(u => u.Id == _currentUserService.UserId);

        var userOrganizedMeeting = user.OrganizedMeetings?.FirstOrDefault(m => m.Id == id);
        if (userOrganizedMeeting is not null)
            return null;

        var followedMeeting = user.FollowedOrParticipatedInMeetings?.FirstOrDefault(m => m.MeetingId == id);
        if (followedMeeting is null)
        {
            await _dbContext.UserFollowedMeetings.AddAsync(new UserMeeting(user.Id, id));
        }
        else
        {
            _dbContext.UserFollowedMeetings.Remove(followedMeeting);
        }

        await _dbContext.SaveChangesAsync();

        return new ParticipationDto
        {
            IsCurrentUserParticipating = IsCurrentUserParticipating(meeting.Id, user),
            ParticipantsCount = meeting.Participants.Count
        };
    }

    public async Task<PaginatedList<MeetingDto>> GetMeetingsInDistance(GetMeetingsInDistanceDto request)
    {
        request.Radius ??= 0;

        request.Radius /= 111.32;
        var meetingsInDistance = await _dbContext.Meetings
            .Include(m => m.Location)
            .Include(m => m.Organizer)
            .Include(m => m.Participants)
            .Include(m => m.Comments)
            .Where(m =>
                m.End >= request.When &&
                m.Start.DayOfYear >= request.When.DayOfYear &&
                request.When.Year == m.End.Year
            )
            .Where(m => m.Location.Location.Distance(new Point(request.Lon, request.Lat) { SRID = 4326 }) <= request.Radius)
            .OrderBy(m => m.Location.Location.Distance(new Point(request.Lon, request.Lat) { SRID = 4326 }))
            .ToListAsync();

        var user = await GetUser();
        var a = meetingsInDistance
            .Select(m =>
            {
                var meetingDto = ToMeetingDto(m, user);
                meetingDto.Image = _pictureService.GetRawImage(m.ImageName);
                return meetingDto;
            })
            .ToImmutableList()
            .ToPaginatedList(request.PageNumber, request.PageSize);
        return a;
    }

    public IReadOnlyList<UserDto> GetMeetingParticipants(int id)
    {
        var participants = _dbContext.Meetings
            .Where(m => m.Id == id)
            .Include(m => m.Participants)
            .ThenInclude(p => p.User)
            .SelectMany(m => m.Participants);

        var a = participants
            .Select(p => p.User.ToUserDto())
            .ToImmutableList();
        return a;
    }

    public async Task AddNote(AddNoteDto request)
    {
        var user = await GetUser();
        var meetingParticipants = GetMeetingParticipants(request.MeetingId);
        if (meetingParticipants.All(u => u.Nickname != user!.Nickname))
            throw new ArgumentException("User has not participated in the meeting", nameof(request.MeetingId));

        var meeting = await GetMeetingById(request.MeetingId);
        if (meeting.End > DateTimeOffset.UtcNow)
            throw new ArgumentException("Meeting has not ended yet", nameof(meeting.Id));

        await _noteService.AddNote(meeting.Id, user!.Id, request.Content);
    }

    public async Task<List<GroupedNotes>> GetNotes(int meetingId)
    {
        var meeting = await GetMeetingById(meetingId);
        return _noteService.GetNotes(meeting.Id);
    }

    public async Task Cancel(int meetingId)
    {
        var user = await GetUser();
        if (user is null)
            throw new ArgumentNullException(nameof(user));

        var meeting = await GetMeetingById(meetingId);
        if (meeting.Organizer.Id != user.Id)
            throw new ArgumentException("You are not the organizer of this meeting", nameof(meetingId));
        if (meeting.End < DateTimeOffset.UtcNow)
            throw new ArgumentException("Meeting has finished already", nameof(meetingId));

        _dbContext.Meetings.Remove(meeting);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<MeetingDto> GetMeetingBy(int id)
    {
        return (await GetMeetingById(id)).ToMeetingDto();
    }

    private MeetingDto ToMeetingDto(Meeting meeting, User? user)
    {
        var meetingDto = meeting.ToMeetingDto();
        meetingDto.IsCurrentUserParticipating = IsCurrentUserParticipating(meetingDto.Id, user);
        meetingDto.ParticipantsCount = meeting.Participants.Count;
        meetingDto.CommentsCount = meeting.Comments.Count;
        return meetingDto;
    }

    private async Task<Meeting> GetMeetingById(int id)
    {
        return await _dbContext.Meetings
                   .Include(m => m.Organizer)
                   .Include(m => m.Location)
                   .SingleOrDefaultAsync(m => m.Id == id)
               ?? throw new ArgumentException("Could not find the meeting", nameof(id));
    }

    private bool IsCurrentUserParticipating(int meetingId, User? user)
    {
        if (user is null || user.FollowedOrParticipatedInMeetings.IsNullOrEmpty())
            return false;

        return user.FollowedOrParticipatedInMeetings!.Any(m => m.MeetingId == meetingId);
    }

    private async Task<User?> GetUser()
    {
        return await _dbContext.Users.SingleOrDefaultAsync(u => u.Id == _currentUserService.UserId);
    }
}