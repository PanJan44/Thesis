namespace Backend.Responses;

public class GroupedNotes
{
    public int AuthorId { get; set; }
    public string Nickname { get; set; } = null!;
    public List<NoteDto> Notes { get; set; } = null!;
}