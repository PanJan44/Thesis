using Backend.Requests.Commands;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("getUserWithOrganizedMeetings")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserWithOrganizedMeetings([FromQuery] int? id)
    {
        var (user, organizedMeetings) = await _userService.GetUserWithOrganizedMeetings(id);
        return Ok(new { user, organizedMeetings });
    }

    [HttpGet("getUserOrganizedMeetings")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserOrganizedMeetings([FromQuery] int? id)
    {
        return Ok(await _userService.GetUserOrganizedMeetings(id));
    }

    [HttpGet("getUserTakenPartInMeetings")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserTakenPartInMeetings([FromQuery] int? id)
    {
        return Ok(await _userService.GetUserTakenPartInMeetings(id));
    }

    [HttpGet("getUserTakingPartInMeetings")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserTakingPartInMeetings([FromQuery] int? id)
    {
        return Ok(await _userService.GetUserTakingPartInMeetings(id));
    }

    [HttpPut("additionalInformation")]
    public async Task<IActionResult> AddAdditionalInformation([FromBody] AddUserAdditionalInformationDto request)
    {
        await _userService.AddAdditionalInformation(request);
        return Ok();
    }

    [HttpDelete("removeUserComment")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RemoveUserComment([FromQuery] int commentId)
    {
        await _userService.RemoveUsersComment(commentId);
        return Ok();
    }

    [HttpGet("banUser")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> BanUser([FromQuery] int userId)
    {
        await _userService.BanUser(userId);
        return Ok();
    }

    [HttpGet("unbanUser")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UnbanUser([FromQuery] int userId)
    {
        await _userService.UnbanUser(userId);
        return Ok();
    }
}