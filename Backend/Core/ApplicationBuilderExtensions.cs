using System.Reflection;
using System.Text;
using Backend.Core;
using Backend.Domain;
using Backend.Domain.Entities;
using Backend.Services;
using Backend.Services.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Backend;

public static class ApplicationBuilderExtensions
{
    public static WebApplicationBuilder AddDbContext(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(builder.Configuration.GetConnectionString("postgres"), o => o.UseNetTopologySuite());
        });
        return builder;
    }

    public static WebApplicationBuilder AddApplicationServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        services.AddSingleton<IActionFilter, BanFilter>();
        services.AddTransient<IPictureService, PictureService>();
        services.AddScoped<IMeetingService, MeetingService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<INoteService, NoteService>();
        services.AddTransient<ICommentService, CommentService>();
        services.AddScoped<ErrorHandlingMiddleware>();
        services.AddScoped<DbSeeder>();

        return builder;
    }

    public static WebApplicationBuilder AddCors(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        services.AddCors(p => p.AddPolicy("corsapp", cfg =>
            cfg.AllowAnyMethod()
                .AllowAnyHeader()
                .WithOrigins("*")));

        return builder;
    }

    public static WebApplication SeedDatabase(this WebApplication app)
    {
        var scope = app.Services.CreateScope();
        var seeder = scope.ServiceProvider.GetRequiredService<DbSeeder>();
        seeder.Seed();

        return app;
    }

    public static WebApplicationBuilder AddAccountRelatedServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
        services.AddScoped<IAccountService, AccountService>();

        var authSettings = new JwtAuthSettings();
        builder.Configuration.Bind("Auth", authSettings);
        services.AddSingleton(authSettings);
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = authSettings.JwtIssuer,
                    ValidAudience = authSettings.JwtIssuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSettings.JwtKey))
                };
            }
        );

        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddHttpContextAccessor();

        return builder;
    }

    public static WebApplicationBuilder AddFluentValidator(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddSingleton<IValidator<ValidationRules.RegisterUserValidator>>();
        services.AddSingleton<IValidator<ValidationRules.LoginUserValidator>>();
        services.AddSingleton<IValidator<ValidationRules.CreateMeetingValidator>>();
        services.AddSingleton<IValidator<ValidationRules.AddNoteValidator>>();
        services.AddSingleton<IValidator<ValidationRules.AddCommentValidator>>();
        return builder;
    }
}