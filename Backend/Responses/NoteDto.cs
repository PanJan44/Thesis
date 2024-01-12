namespace Backend.Responses;

public class NoteDto
{
    public int Id { get; set; }
    public string Content { get; set; } = null!;
    public DateTimeOffset CreationDate { get; set; }
}