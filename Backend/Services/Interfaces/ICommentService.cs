using Backend.Requests;
using Backend.Responses;

namespace Backend.Services.Interfaces;

public interface ICommentService
{
    Task<CommentDto> Add(AddCommentDto request);
    Task<IReadOnlyList<CommentDto>> GetMeetingComments(int meetingId);
}