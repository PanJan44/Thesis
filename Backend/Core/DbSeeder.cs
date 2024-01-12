using Backend.Domain;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Core;

public class DbSeeder
{
    private readonly ApplicationDbContext _dbContext;

    public DbSeeder(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void Seed()
    {
        if (!_dbContext.Database.CanConnect()) return;
        if (_dbContext.Roles.Any()) return;

        var pendingMigrations = _dbContext.Database.GetPendingMigrations();
        if (pendingMigrations.Any())
            _dbContext.Database.Migrate();

        _dbContext.Roles.AddRange(
            new Role { Name = "User" },
            new Role { Name = "Admin" }
        );

        _dbContext.SaveChanges();
    }
}