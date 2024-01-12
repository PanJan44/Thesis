namespace Backend.Core;

public static class DistanceCalculator
{
    private const int EarthRadiusKm = 6371;

    public static double DistanceBetweenTwoPoints(double lat1, double lon1, double lat2, double lon2)
    {
        var (lat1Rad, lon1Rad) = DegreesCordsToRadiansCoords(lat1, lon1);
        var (lat2Rad, lon2Rad) = DegreesCordsToRadiansCoords(lat2, lon2);

        // Haversine formula 
        var dLon = lon2Rad - lon1Rad;
        var dLat = lat2Rad - lat1Rad;
        var a = Math.Pow(Math.Sin(dLat / 2), 2) +
                Math.Cos(lat1Rad) * Math.Cos(lat2Rad) *
                Math.Pow(Math.Sin(dLon / 2), 2);

        var res = 2 * Math.Asin(Math.Sqrt(a)) * EarthRadiusKm;
        return res;
    }

    private static (double, double) DegreesCordsToRadiansCoords(double lat, double lon)
    {
        var latRad = lat * (Math.PI / 180);
        var lonRad = lon * (Math.PI / 180);

        return (latRad, lonRad);
    }
}