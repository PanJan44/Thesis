namespace Backend.Requests;

public class AddCommentDto
{
    public string Content { get; set; } = null!;
    public int MeetingId { get; set; }
}