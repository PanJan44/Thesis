using Backend.Core;
using Backend.Requests;
using Backend.Requests.Commands;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class MeetingController : ControllerBase
{
    private readonly IMeetingService _meetingService;
    private readonly ICommentService _commentService;

    public MeetingController(IMeetingService meetingService, ICommentService commentService)
    {
        _meetingService = meetingService;
        _commentService = commentService;
    }

    [HttpPost]
    [BanFilter]
    public async Task<IActionResult> CreateMeeting([FromBody] CreateMeetingDto request)
    {
        return Ok(await _meetingService.Create(request));
    }

    [HttpPost("participate")]
    public async Task<IActionResult> MarkParticipationInTheMeeting([FromQuery] int id)
    {
        return Ok(await _meetingService.MarkParticipation(id));
    }

    [HttpGet("meetingsInDistance")]
    [AllowAnonymous]
    public async Task<IActionResult> MeetingsInDistance([FromQuery] GetMeetingsInDistanceDto request)
    {
        return Ok(await _meetingService.GetMeetingsInDistance(request));
    }

    [HttpGet("comments")]
    [AllowAnonymous]
    public async Task<IActionResult> MeetingComments(int meetingId)
    {
        return Ok(await _commentService.GetMeetingComments(meetingId));
    }

    [HttpPost("addComment")]
    public async Task<IActionResult> AddComment([FromBody] AddCommentDto request)
    {
        return Ok(await _commentService.Add(request));
    }

    [HttpGet("getParticipants")]
    [AllowAnonymous]
    public IActionResult GetParticipants([FromQuery] int meetingId)
    {
        return Ok(_meetingService.GetMeetingParticipants(meetingId));
    }

    [HttpPost("addNote")]
    public async Task<IActionResult> AddNote([FromBody] AddNoteDto request)
    {
        await _meetingService.AddNote(request);
        return Ok();
    }

    [HttpGet("getNotes")]
    public async Task<IActionResult> GetNotes([FromQuery] int meetingId)
    {
        return Ok(await _meetingService.GetNotes(meetingId));
    }

    [HttpGet("cancel")]
    public async Task<IActionResult> Cancel([FromQuery] int meetingId)
    {
        await _meetingService.Cancel(meetingId);
        return Ok();
    }

    [HttpGet("getMeeting")]
    public async Task<IActionResult> GetMeetingById([FromQuery] int id)
    {
        await _meetingService.GetMeetingBy(id);
        return Ok();
    }
}