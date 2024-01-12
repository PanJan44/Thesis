using System.ComponentModel;

namespace Backend.Domain.Entities;

public class Address
{
    public string PlaceId { get; set; } = null!;
    [Bindable(false)] public NetTopologySuite.Geometries.Point Location { get; set; } = null!;
    public string PlaceName { get; set; } = null!;
    public string City { get; set; } = null!;
    public string? StreetName { get; set; }
    public int? StreetNumber { get; set; }
    public string PlaceUrl { get; set; } = null!;
    public virtual List<Meeting>? Meetings { get; set; }
}