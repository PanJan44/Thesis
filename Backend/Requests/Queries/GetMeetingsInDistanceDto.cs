namespace Backend.Requests.Commands;

public class GetMeetingsInDistanceDto
{
    public double Lat { get; set; }
    public double Lon { get; set; }
    public double? Radius { get; set; }
    public DateTimeOffset When { get; set; }
    public int? PageSize { get; set; }
    public int? PageNumber { get; set; }
}