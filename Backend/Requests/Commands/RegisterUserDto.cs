namespace Backend.Requests.Commands;

/// <summary>
/// To DTO służy jedynie do rejestracji, jeżeli pomyślnie się uda
/// zarejestrować to będzie kolejny ekran, na którym będzie można
/// uzupełnić pozostałe dane, które są w encji User
/// </summary>
public class RegisterUserDto
{
    public string Email { get; init; } = null!;
    public string Nickname { get; init; } = null!;
    public string Password { get; init; } = null!;
    public string ConfirmedPassword { get; init; } = null!;
}