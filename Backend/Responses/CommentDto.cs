namespace Backend.Responses;

public class CommentDto
{
    public int Id { get; set; }
    public int Likes { get; set; }
    public int DisLikes { get; set; }
    public string Content { get; set; } = null!;
    public UserDto Author { get; set; } = null!;
    public DateTimeOffset CreationTime { get; set; }
    public bool? IsLikedOrDislikedByUser { get; set; }
}