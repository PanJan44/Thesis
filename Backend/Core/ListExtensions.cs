namespace Backend.Core;

public static class ListExtensions
{
    public static PaginatedList<T> ToPaginatedList<T>(this IList<T> source, int? pageNumber, int? pageSize)
    {
        var count = source.Count();

        if (pageSize.HasValue && pageNumber.HasValue)
        {
            source = source.Skip((pageNumber.Value - 1) * pageSize.Value).Take(pageSize.Value).ToList();
        }

        return new PaginatedList<T>(source);
    }
}