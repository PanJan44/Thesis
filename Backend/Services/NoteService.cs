using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Responses;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class NoteService : INoteService
{
    private readonly ApplicationDbContext _dbContext;

    public NoteService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddNote(int meetingId, int authorId, string content)
    {
        await _dbContext.Notes.AddAsync(new Note
        {
            CreationDate = DateTimeOffset.UtcNow,
            MeetingId = meetingId,
            Content = content,
            AuthorId = authorId
        });

        await _dbContext.SaveChangesAsync();
    }

    public List<GroupedNotes> GetNotes(int meetingId)
    {
        var notes = _dbContext.Notes
            .Include(n => n.Author)
            .Where(n => n.MeetingId == meetingId)
            .GroupBy(x => new { x.AuthorId, x.Author.Nickname })
            .Select(group => new GroupedNotes
            {
                AuthorId = group.Key.AuthorId,
                Nickname = group.Key.Nickname,
                Notes = group.Select(note => new NoteDto
                {
                    CreationDate = note.CreationDate,
                    Id = note.Id,
                    Content = note.Content
                }).ToList()
            }).ToList();

        return notes;
    }
}