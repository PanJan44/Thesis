namespace Backend.Domain.Entities;

public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; } = null!;
    public virtual User User { get; set; } = null!;
    public int MeetingId { get; set; }
    public virtual Meeting Meeting { get; set; } = null!;
    public DateTime CreationDate { get; set; }
}