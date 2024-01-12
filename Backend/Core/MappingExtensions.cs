using Backend.Domain.Entities;
using Backend.Requests.Commands;
using Backend.Responses;

namespace Backend.Core;

public static class MappingExtensions
{
    public static MeetingDto ToMeetingDto(this Meeting meeting)
    {
        return new MeetingDto
        {
            Id = meeting.Id,
            Description = meeting.Description,
            Start = meeting.Start,
            End = meeting.End,
            Location = meeting.Location.ToAddressDto(),
            Title = meeting.Title,
            Organizer = meeting.Organizer.ToUserDto(),
        };
    }

    public static MeetingOverviewDto ToMeetingOverviewDto(this Meeting meeting)
    {
        return new MeetingOverviewDto
        {
            Id = meeting.Id,
            Start = meeting.Start,
            End = meeting.End,
            Location = meeting.Location.ToAddressDto(),
            Title = meeting.Title,
        };
    }

    public static Meeting ToMeeting(this CreateMeetingDto request)
    {
        return new Meeting
        {
            Title = request.Title,
            Description = request.Description,
            Start = request.Start,
            End = request.End,
            CreationDate = DateTime.UtcNow,
        };
    }

    public static UserDto ToUserDto(this User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Nickname = user.Nickname,
        };
    }

    public static UserDetailsDto ToUserDetailsDto(this User user)
    {
        return new UserDetailsDto
        {
            Id = user.Id,
            Nickname = user.Nickname,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Achievements = user.Achievements,
            ActivityStatus = user.ActivityStatus,
            TrainingSince = user.TrainingSince,
            IsBanned = user.IsBanned
        };
    }

    public static CommentDto ToCommentDto(this Comment comment)
    {
        return new CommentDto
        {
            Id = comment.Id,
            Author = comment.User.ToUserDto(),
            Content = comment.Content,
            CreationTime = comment.CreationDate
        };
    }

    private static AddressDto ToAddressDto(this Address address)
    {
        return new AddressDto
        {
            City = address.City,
            PlaceName = address.PlaceName,
            PlaceUrl = address.PlaceUrl,
            StreetName = address?.StreetName,
            StreetNumber = address?.StreetNumber
        };
    }
}