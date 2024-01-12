using Backend;
using Backend.Core;

class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var services = builder.Services;

        builder.AddDbContext()
            .AddApplicationServices()
            .AddCors()
            .AddAccountRelatedServices()
            .AddFluentValidator();

        services.AddControllers()
            .AddNewtonsoftJson();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        var app = builder
            .Build()
            .SeedDatabase();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseMiddleware<ErrorHandlingMiddleware>();
        app.UseAuthentication();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}