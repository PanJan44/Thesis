namespace Backend.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Nickname { get; set; } = null!;
    public DateTimeOffset? TrainingSince { get; set; }
    public string? Achievements { get; set; }
    public string PasswordHash { get; set; } = null!;
    public UserActivityStatus? ActivityStatus { get; set; }
    public int RoleId { get; set; }
    public bool IsBanned { get; set; }
    public virtual Role Role { get; set; } = null!;
    public virtual List<UserMeeting> FollowedOrParticipatedInMeetings { get; set; } = new();
    public virtual List<Meeting> OrganizedMeetings { get; set; } = new();
    public virtual List<Note>? Notes { get; set; }
}

public enum UserActivityStatus
{
    Active = 1,
    Inactive,
    Injured,
}