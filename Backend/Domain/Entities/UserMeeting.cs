namespace Backend.Domain.Entities;

public class UserMeeting
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int MeetingId { get; set; }
    public Meeting Meeting { get; set; } = null!;

    public UserMeeting(User user, Meeting meeting)
    {
        User = user;
        Meeting = meeting;
    }

    public UserMeeting(int userId, int meetingId)
    {
        UserId = userId;
        MeetingId = meetingId;
    }
}