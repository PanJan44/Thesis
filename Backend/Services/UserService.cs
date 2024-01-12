using System.Linq.Expressions;
using Backend.Core;
using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Requests.Commands;
using Backend.Responses;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;
    private readonly IPictureService _pictureService;

    public UserService(ApplicationDbContext dbContext, ICurrentUserService currentUserService, IPictureService pictureService)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
        _pictureService = pictureService;
    }

    public async Task<(UserDetailsDto user, IReadOnlyList<MeetingOverviewDto> organizedMeetings)> GetUserWithOrganizedMeetings(int? id)
    {
        var user = await GetUserById(id);
        var organizedMeetings = await GetUserOrganizedMeetings(id);

        return (user, organizedMeetings);
    }

    public async Task<IReadOnlyList<MeetingOverviewDto>> GetUserOrganizedMeetings(int? id)
    {
        var user = await GetUserById(id);
        var meetings = GetMeetingsByCondition(m => m.Organizer.Id == user.Id,
            queryable => { return queryable.OrderByDescending(m => m.End); }
        ).ToList();

        return MapMeetingOverviewDtos(meetings).AsReadOnly();
    }

    public async Task<IReadOnlyList<MeetingOverviewDto>> GetUserTakenPartInMeetings(int? id)
    {
        var user = await GetUserById(id);
        var meetings = GetMeetingsByCondition((m => m.Participants.Any(p => p.UserId == user.Id) && m.End <= DateTimeOffset.UtcNow),
            queryable => { return queryable.OrderByDescending(m => m.End); }
        ).ToList();

        return MapMeetingOverviewDtos(meetings).AsReadOnly();
    }

    public async Task<IReadOnlyList<MeetingOverviewDto>> GetUserTakingPartInMeetings(int? id)
    {
        var user = await GetUserById(id);
        var meetings = GetMeetingsByCondition((m => m.Participants.Any(p => p.UserId == user.Id) && m.End > DateTimeOffset.UtcNow)
            , queryable => { return queryable.OrderByDescending(m => m.End); }
        ).ToList();

        return MapMeetingOverviewDtos(meetings).AsReadOnly();
    }

    public async Task RemoveUsersComment(int commentId)
    {
        var comment = await _dbContext.Comments.SingleAsync(c => c.Id == commentId);
        _dbContext.Comments.Remove(comment);
    }

    public async Task BanUser(int userId)
    {
        var user = await _dbContext.Users.SingleAsync(u => u.Id == userId);
        user.IsBanned = true;

        var userComments = _dbContext.Comments
            .Include(c => c.User)
            .Where(c => c.User.Id == userId);

        _dbContext.Comments.RemoveRange(userComments);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UnbanUser(int userId)
    {
        var user = await _dbContext.Users.SingleAsync(u => u.Id == userId);
        user.IsBanned = false;
        await _dbContext.SaveChangesAsync();
    }

    public async Task AddAdditionalInformation(AddUserAdditionalInformationDto request)
    {
        var user = await _dbContext.Users.SingleAsync(u => u.Id == _currentUserService.UserId);
        if (!IsUserAdditionalInformationUpdated(user, request))
            return;

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Achievements = request.Achievements;
        user.TrainingSince = request.TrainingSince;
        user.ActivityStatus = request.ActivityStatus ?? UserActivityStatus.Active;

        await _dbContext.SaveChangesAsync();
    }

    private bool IsUserAdditionalInformationUpdated(User user, AddUserAdditionalInformationDto request)
    {
        return user.FirstName != request.FirstName || user.LastName != request.LastName
                                                   || user.Achievements != request.Achievements ||
                                                   user.ActivityStatus != request.ActivityStatus
                                                   || user.TrainingSince != request.TrainingSince;
    }

    private List<MeetingOverviewDto> MapMeetingOverviewDtos(IEnumerable<Meeting> meetings)
    {
        return meetings.Select(m =>
        {
            var meetingOverviewDto = m.ToMeetingOverviewDto();
            meetingOverviewDto.Image = _pictureService.GetRawImage(m.ImageName);
            return meetingOverviewDto;
        }).ToList();
    }

    private async Task<UserDetailsDto> GetUserById(int? id)
    {
        var idToQuery = id ?? _currentUserService.UserId ??
            throw new ArgumentNullException(nameof(id));

        return (await _dbContext.Users
                .SingleAsync(u => u.Id == idToQuery))
            .ToUserDetailsDto();
    }

    private IQueryable<Meeting> GetMeetingsByCondition(Expression<Func<Meeting, bool>> condition,
        Func<IQueryable<Meeting>, IOrderedQueryable<Meeting>>? orderFunc = null)
    {
        var query = _dbContext.Meetings
            .Include(m => m.Organizer)
            .Include(m => m.Location)
            .Include(m => m.Participants)
            .Where(condition);

        if (orderFunc != null)
            query = orderFunc(query);

        return query;
    }
}