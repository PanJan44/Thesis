namespace Backend.Responses;

public class MeetingDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public DateTimeOffset Start { get; set; }
    public DateTimeOffset End { get; set; }
    public int ParticipantsCount { get; set; }
    public int CommentsCount { get; set; }

    // public List<UserDto> Participants { get; set; } = new();
    public UserDto Organizer { get; set; } = null!;
    public FileDto? Image { get; set; }
    public AddressDto Location { get; set; } = null!;
    public bool IsCurrentUserParticipating { get; set; }
}