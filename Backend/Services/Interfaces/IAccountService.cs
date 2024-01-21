using Backend.Requests.Commands;
using Backend.Responses;

namespace Backend.Services.Interfaces;

public interface IAccountService
{
    Task<int> Register(RegisterUserDto request);
    Task<string> Login(LoginUserDto request);
    int? GetCurrentUserId();
    string? GetCurrentUserRole();
    string? GetCurrentUserBanStatus();
}