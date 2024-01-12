using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Core;
using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Requests.Commands;
using Backend.Responses;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services;

public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly JwtAuthSettings _authSettings;
    private readonly ICurrentUserService _currentUserService;

    public AccountService(
        ApplicationDbContext dbContext,
        IPasswordHasher<User> passwordHasher,
        JwtAuthSettings authSettings,
        ICurrentUserService currentUserService)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _authSettings = authSettings;
        _currentUserService = currentUserService;
    }

    public int? GetCurrentUserId() => _currentUserService.UserId;

    public string? GetCurrentUserRole() => _currentUserService.Role;

    public async Task<bool?> GetCurrentUserBanStatus()
    {
        return (await _dbContext.Users.FirstAsync(u => u.Id == _currentUserService.UserId)).IsBanned;
    }

    public async Task<int> Register(RegisterUserDto request)
    {
        var user = new User
        {
            Email = request.Email,
            Nickname = request.Nickname,
            ActivityStatus = UserActivityStatus.Active, //by default
            RoleId = 1
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);
        await _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();

        return user.Id;
    }

    public async Task<string> Login(LoginUserDto request)
    {
        var user = await _dbContext.Users.Include(u => u.Role).SingleOrDefaultAsync(u => u.Email == request.Email)
                   ?? throw new ArgumentException("Niepoprawne dane logowania");

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
            throw new ArgumentException("Niepoprawny email lub hasło");

        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Nickname),
            new(ClaimTypes.Role, user.Role.Name),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.JwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTimeOffset.Now.AddDays(_authSettings.JwtExpireDays);

        var token = new JwtSecurityToken(
            _authSettings.JwtIssuer,
            _authSettings.JwtIssuer,
            claims,
            expires: expires.DateTime,
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}