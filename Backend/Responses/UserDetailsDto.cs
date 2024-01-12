using Backend.Domain.Entities;

namespace Backend.Responses;

public class UserDetailsDto
{
    public int Id { get; set; }
    public string Nickname { get; set; } = null!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTimeOffset? TrainingSince { get; set; }
    public string? Achievements { get; set; }
    public UserActivityStatus? ActivityStatus { get; set; }
    public bool IsBanned { get; set; }
}