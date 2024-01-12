namespace Backend.Responses;

public class FileDto
{
    public byte[] File { get; init; } = null!;
    public string ContentType { get; init; } = null!;
}