namespace Backend.Domain.Entities;

public class Meeting
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public DateTimeOffset Start { get; set; }
    public DateTimeOffset End { get; set; }
    public DateTime CreationDate { get; set; }
    public virtual User Organizer { get; set; } = null!;
    public string? ImageName { get; set; }
    public virtual List<Comment> Comments { get; set; } = new();
    public virtual List<UserMeeting> Participants { get; set; } = new();
    public string PlaceId { get; set; } = null!;
    public virtual Address Location { get; set; } = null!;
    public virtual List<Note>? Notes { get; set; }
}