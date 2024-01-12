using Backend.Domain.Entities;
using Backend.Responses;

namespace Backend.Requests.Commands;

public class CreateMeetingDto
{
    public AddressDto Address { get; init; } = null!;
    public string Title { get; init; } = null!;
    public string? Description { get; init; }
    public DateTimeOffset Start { get; init; }
    public DateTimeOffset End { get; init; }
    public string? PictureBase64 { get; init; }
}