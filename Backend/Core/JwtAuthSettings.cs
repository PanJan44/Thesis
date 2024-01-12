namespace Backend.Core;

public class JwtAuthSettings
{
    public string JwtKey { get; set; } = null!;
    public int JwtExpireDays { get; set; }
    public string JwtIssuer { get; set; } = null!;
}