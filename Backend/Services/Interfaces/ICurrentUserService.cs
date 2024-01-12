using System.Security.Claims;

namespace Backend.Services.Interfaces;

public interface ICurrentUserService
{
    public ClaimsPrincipal? User { get; }
    public int? UserId { get; }
    public string? Role { get; }
}