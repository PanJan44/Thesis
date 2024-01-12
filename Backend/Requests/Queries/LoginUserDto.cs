namespace Backend.Requests.Commands;

public class LoginUserDto
{
    public string Email { get; init; } = null!;
    public string Password { get; init; } = null!;
}