using Backend.Requests.Commands;
using Backend.Responses;

namespace Backend.Services.Interfaces;

public interface IUserService
{
    Task AddAdditionalInformation(AddUserAdditionalInformationDto request);
    Task<(UserDetailsDto user, IReadOnlyList<MeetingOverviewDto> organizedMeetings)> GetUserWithOrganizedMeetings(int? id);
    Task<IReadOnlyList<MeetingOverviewDto>> GetUserOrganizedMeetings(int? id);
    Task<IReadOnlyList<MeetingOverviewDto>> GetUserTakenPartInMeetings(int? id);
    Task<IReadOnlyList<MeetingOverviewDto>> GetUserTakingPartInMeetings(int? id);
    Task RemoveUsersComment(int commentId);
    Task BanUser(int userId);
    Task UnbanUser(int userId);
}