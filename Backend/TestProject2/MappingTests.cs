namespace TestProject2;

using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Services;
using Backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Point = NetTopologySuite.Geometries.Point;

[TestFixture]
public class MappingTests
{
    private readonly ApplicationDbContext _dbContext;
    private readonly INoteService _noteService;

    public MappingTests()
    {
        _dbContext = new ApplicationDbContext(new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb").Options);
        _noteService = new NoteService(_dbContext);
    }

    [Test]
    public async Task TestGetNotes_OneUser()
    {
        //Arrange
        var user = new User { Id = 1, Nickname = "TestUser", Email = "test@test.com", PasswordHash = "123456" };
        var address = GetTestAddress();
        var meeting = GetTestMeeting(address, user);

        await _dbContext.Addresses.AddAsync(address);
        await _dbContext.Meetings.AddAsync(meeting);

        var notes = new List<Note>
        {
            new()
            {
                Id = 1,
                Author = user,
                AuthorId = user.Id,
                Content = "Test Note 1",
                CreationDate = DateTimeOffset.UtcNow,
                Meeting = meeting,
                MeetingId = meeting.Id,
            },
            new()
            {
                Id = 2,
                Author = user,
                AuthorId = user.Id,
                Content = "Test Note 2",
                CreationDate = DateTimeOffset.UtcNow,
                Meeting = meeting,
                MeetingId = meeting.Id
            }
        };

        await _dbContext.Notes.AddRangeAsync(notes);
        await _dbContext.SaveChangesAsync();

        //Act
        var groupedNotes = _noteService.GetNotes(meeting.Id);

        //Assert
        Assert.That(groupedNotes, Has.Count.EqualTo(1));
        Assert.That(groupedNotes.First(), Has.Property("Nickname").EqualTo(user.Nickname));
        Assert.That(groupedNotes.First().Notes.Count, Is.EqualTo(2));
        Assert.That(groupedNotes.First().Notes.First().Content, Is.EqualTo(notes.First().Content));

        await _dbContext.Database.EnsureDeletedAsync();
    }

    [Test]
    public async Task TestGetNote_TwoUsers()
    {
        //Arrange
        var user1 = new User { Id = 1, Nickname = "TestUser", Email = "test@test.com", PasswordHash = "123456" };
        var user2 = new User { Id = 2, Nickname = "TestUser2", Email = "test2@test.com", PasswordHash = "123456" };
        var address = GetTestAddress();
        var meeting = GetTestMeeting(address, user1);

        await _dbContext.Addresses.AddAsync(address);
        await _dbContext.Meetings.AddAsync(meeting);

        var notes = new List<Note>
        {
            new()
            {
                Id = 1,
                Author = user1,
                AuthorId = user1.Id,
                Content = "Test Note 1",
                CreationDate = DateTimeOffset.UtcNow,
                Meeting = meeting,
                MeetingId = meeting.Id,
            },
            new()
            {
                Id = 2,
                Author = user1,
                AuthorId = user1.Id,
                Content = "Test Note 2",
                CreationDate = DateTimeOffset.UtcNow,
                Meeting = meeting,
                MeetingId = meeting.Id
            },
            new()
            {
                Id = 3,
                Author = user2,
                AuthorId = user2.Id,
                Content = "Test Note 3",
                CreationDate = DateTimeOffset.UtcNow,
                Meeting = meeting,
                MeetingId = meeting.Id
            }
        };


        await _dbContext.Notes.AddRangeAsync(notes);
        await _dbContext.SaveChangesAsync();

        //Act
        var groupedNotes = _noteService.GetNotes(meeting.Id);

        Assert.That(groupedNotes, Has.Count.EqualTo(2));
        Assert.That(groupedNotes.First(), Has.Property("Nickname").EqualTo(user1.Nickname));
        Assert.That(groupedNotes[1], Has.Property("Nickname").EqualTo(user2.Nickname));
        Assert.That(groupedNotes.Find(x => x.AuthorId == user2.Id)!.Notes, Has.Count.EqualTo(1));
        Assert.That(groupedNotes.Find(x => x.AuthorId == user2.Id)!.Notes.First().Id, Is.EqualTo(3));

        await _dbContext.Database.EnsureDeletedAsync();
    }

    private static Address GetTestAddress()
    {
        return new Address
        {
            City = "TestCity",
            Location = new Point(1, 1) { SRID = 4326 },
            PlaceId = "TestPlaceId",
            PlaceName = "TestPlaceName",
            PlaceUrl = "TestPlaceUrl",
        };
    }

    private static Meeting GetTestMeeting(Address address, User user)
    {
        return new Meeting
        {
            Id = 1,
            CreationDate = DateTime.Now,
            Start = DateTimeOffset.UtcNow,
            End = DateTimeOffset.UtcNow + TimeSpan.FromDays(1),
            Title = "Test meeting",
            Organizer = user,
            Location = address,
            PlaceId = address.PlaceId
        };
    }
}