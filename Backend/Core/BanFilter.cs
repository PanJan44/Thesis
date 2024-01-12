using Backend.Domain;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Core;

public class BanFilter : ActionFilterAttribute, IActionFilter
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var userId = context.HttpContext.RequestServices.GetService<ICurrentUserService>()?.UserId;
        var dbContext = context.HttpContext.RequestServices.GetService<ApplicationDbContext>();
        if (userId == null)
            throw new InvalidOperationException();
        if (dbContext is null)
            throw new InvalidOperationException();

        var user = dbContext.Users.First(u => u.Id == userId);
        if (!user.IsBanned) return;

        context.Result = new ForbidResult();
        context.HttpContext.Response.WriteAsync("Jestes zablokowany, nie możesz dodać treningu");
    }
}