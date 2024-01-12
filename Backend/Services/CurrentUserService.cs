using System.Security.Claims;
using Backend.Services.Interfaces;

namespace Backend.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

    public int? UserId => User is null
        ? null
        : ParseIdentifier();

    public string? Role => User?.FindFirstValue(ClaimTypes.Role);

    private int? ParseIdentifier()
    {
        return int.TryParse(User!.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;
    }
}