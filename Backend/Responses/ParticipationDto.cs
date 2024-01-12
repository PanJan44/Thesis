namespace Backend.Responses;

public class ParticipationDto
{
    public bool IsCurrentUserParticipating { get; set; }
    public int ParticipantsCount { get; set; }
}