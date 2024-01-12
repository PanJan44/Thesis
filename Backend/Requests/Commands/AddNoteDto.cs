using System.ComponentModel.DataAnnotations;

namespace Backend.Requests.Commands;

public class AddNoteDto
{
    public int MeetingId { get; set; }
    public string Content { get; set; } = null!;
}