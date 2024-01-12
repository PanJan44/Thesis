using Backend.Responses;

namespace Backend.Services.Interfaces;

public interface INoteService
{
    Task AddNote(int meetingId, int authorId, string content);
    List<GroupedNotes> GetNotes(int meetingId);
}