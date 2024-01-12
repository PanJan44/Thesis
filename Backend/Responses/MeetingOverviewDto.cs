namespace Backend.Responses;

public class MeetingOverviewDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTimeOffset Start { get; set; }
    public DateTimeOffset End { get; set; }
    public FileDto? Image { get; set; }
    public AddressDto Location { get; set; } = null!;
}