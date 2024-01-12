using Backend.Core;
using Backend.Domain.Entities;
using Backend.Requests.Commands;
using Backend.Responses;

namespace Backend.Services.Interfaces;

public interface IMeetingService
{
    Task<int> Create(CreateMeetingDto request);
    Task<ParticipationDto?> MarkParticipation(int id);
    Task<PaginatedList<MeetingDto>> GetMeetingsInDistance(GetMeetingsInDistanceDto request);
    IReadOnlyList<UserDto> GetMeetingParticipants(int id);
    Task AddNote(AddNoteDto request);
    Task<List<GroupedNotes>> GetNotes(int meetingId);
    Task Cancel(int meetingId);
    Task<MeetingDto> GetMeetingBy(int id);
}