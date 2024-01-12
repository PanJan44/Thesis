using Backend.Requests.Commands;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto request)
    {
        return Ok(await _accountService.Register(request));
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] LoginUserDto request)
    {
        return Ok(await _accountService.Login(request));
    }

    [HttpGet("currentUserId")]
    [Authorize]
    public IActionResult GetCurrentUserId()
    {
        return Ok(_accountService.GetCurrentUserId());
    }

    [HttpGet("currentUserRole")]
    [Authorize]
    public IActionResult CurrentUserRole()
    {
        return Ok(_accountService.GetCurrentUserRole());
    }

    [HttpGet("currentUserBanStatus")]
    [Authorize]
    public async Task<IActionResult> CurrentUserBanStatus()
    {
        return Ok(await _accountService.GetCurrentUserBanStatus());
    }
}