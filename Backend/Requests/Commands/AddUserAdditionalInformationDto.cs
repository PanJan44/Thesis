using Backend.Domain.Entities;

namespace Backend.Requests.Commands;

public class AddUserAdditionalInformationDto
{
    public DateTimeOffset? TrainingSince { get; init; }
    public string? Achievements { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public UserActivityStatus? ActivityStatus { get; set; }
}