namespace Backend.Responses;

public class AddressDto
{
    public string PlaceId { get; set; } = null!;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string PlaceName { get; set; } = null!;
    public string City { get; set; } = null!;
    public string? StreetName { get; set; }
    public int? StreetNumber { get; set; }
    public string PlaceUrl { get; set; } = null!;
}