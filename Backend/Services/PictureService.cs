using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Responses;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SixLabors.ImageSharp.Processing.Processors.Transforms;

namespace Backend.Services;

public class PictureService : IPictureService
{
    private readonly ApplicationDbContext _dbContext;

    public PictureService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Add(int userId, int meetingId, string? pictureBase64)
    {
        if (pictureBase64.IsNullOrEmpty())
            return;

        var meeting = await _dbContext.Meetings.SingleOrDefaultAsync(x => x.Id == meetingId)
                      ?? throw new ArgumentException("Could not find a meeting with given id", nameof(meetingId));
        if (meeting.Organizer.Id != userId)
            throw new ArgumentException("User is not an orginizer of the meeting", nameof(userId));

        var imageName = await HandleImageAndGetItsName(pictureBase64!, meetingId);

        meeting.ImageName = imageName;
        await _dbContext.SaveChangesAsync();
    }

    public FileDto? GetRawImage(string? imageName)
    {
        if (imageName.IsNullOrEmpty())
            return null;

        var path = Path.Combine(Path.GetFullPath("Images"), imageName!);
        if (!File.Exists(path))
            throw new ArgumentException("Image does not exist", nameof(imageName));

        var contentProvider = new FileExtensionContentTypeProvider();
        contentProvider.TryGetContentType(path, out var contentType);
        if (contentType is null)
            throw new ArgumentNullException(nameof(contentType));

        var imageContent = File.ReadAllBytes(path);
        return new FileDto { File = imageContent, ContentType = contentType };
    }

    private async Task<string> HandleImageAndGetItsName(string pictureBase64, int meetingId)
    {
        var imageName = $"{meetingId}_{DateTimeOffset.Now:ddMMyyyyhhmmssfff}_{Guid.NewGuid()}.png";
        var filePath = Path.Combine(Path.GetFullPath("Images"), imageName);

        var imageBytes = Convert.FromBase64String(pictureBase64.Split(',')[1]);
        using var image = Image.Load(imageBytes);
        if (image.Size.Width > 2000 || image.Size.Height > 2000)
            image.Mutate(op => op.Resize(new ResizeOptions
            {
                Size = new Size(2000, 2000),
                Mode = ResizeMode.Max,
                Sampler = LanczosResampler.Lanczos3
            }));
        await image.SaveAsync(filePath);
        return imageName;
    }
}