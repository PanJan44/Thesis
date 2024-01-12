using Backend.Domain.Entities;
using Backend.Responses;

namespace Backend.Services.Interfaces;

public interface IPictureService
{
    Task Add(int userId, int meetingId, string? pictureBase64);
    FileDto? GetRawImage(string? imageName);
}