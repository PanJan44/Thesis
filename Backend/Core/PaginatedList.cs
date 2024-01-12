namespace Backend.Core;

public class PaginatedList<T> : List<T>
{
    private List<T> Items { get; init; } = null!;

    public PaginatedList()
    {
    }

    public PaginatedList(IEnumerable<T> items) : base(items)
    {
    }
}