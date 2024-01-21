using Backend.Domain;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend.Core;

public class BanFilter : ActionFilterAttribute, IActionFilter
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
         _ = bool.TryParse(context.HttpContext.RequestServices.GetService<ICurrentUserService>()?.IsBanned,
            out var isBannedResult);
        if (!isBannedResult) return;

        context.Result = new ForbidResult();
        context.HttpContext.Response.WriteAsync("Jestes zablokowany, nie możesz wykonać tej operacji").GetAwaiter().GetResult();
    }
}