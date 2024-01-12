using Backend.Core;
using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Requests;
using Backend.Responses;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class CommentService : ICommentService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly ICurrentUserService _currentUserService;

    public CommentService(ApplicationDbContext dbContext, ICurrentUserService currentUserService)
    {
        _dbContext = dbContext;
        _currentUserService = currentUserService;
    }

    public async Task<CommentDto> Add(AddCommentDto request)
    {
        var user = await GetUser();

        var comment = new Comment
        {
            User = user,
            MeetingId = request.MeetingId,
            Content = request.Content,
            CreationDate = DateTime.UtcNow
        };

        await _dbContext.AddAsync(comment);
        await _dbContext.SaveChangesAsync();

        return comment.ToCommentDto();
    }

    public async Task<IReadOnlyList<CommentDto>> GetMeetingComments(int meetingId)
    {
        return (await _dbContext.Comments
            .Where(c => c.MeetingId == meetingId)
            .Include(c => c.User)
            .OrderByDescending(c => c.CreationDate)
            .Select(c => c.ToCommentDto())
            .ToListAsync()).AsReadOnly();
    }

    private async Task<User> GetUser()
    {
        return await _dbContext.Users.SingleAsync(u => u.Id == _currentUserService.UserId);
    }
}