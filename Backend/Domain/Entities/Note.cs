namespace Backend.Domain.Entities;

public class Note
{
    public int Id { get; set; }
    public string Content { get; set; } = null!;
    public int MeetingId { get; set; }
    public virtual Meeting Meeting { get; set; } = null!;
    public int AuthorId { get; set; }
    public virtual User Author { get; set; } = null!;
    public DateTimeOffset CreationDate { get; set; }
}