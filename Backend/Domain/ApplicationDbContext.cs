using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Meeting> Meetings { get; set; }
    public DbSet<UserMeeting> UserFollowedMeetings { get; set; }
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Role> Roles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasPostgresExtension("postgis");

        modelBuilder.Entity<Address>()
            .Property(a => a.Location)
            .HasColumnType("geometry(Point, 4326)");

        modelBuilder.Entity<Address>()
            .HasKey(a => a.PlaceId);
        modelBuilder.Entity<Address>()
            .HasMany(a => a.Meetings)
            .WithOne(m => m.Location);

        modelBuilder.Entity<Meeting>()
            .HasOne(m => m.Organizer)
            .WithMany(u => u.OrganizedMeetings);

        modelBuilder.Entity<Meeting>()
            .HasOne(m => m.Location)
            .WithMany(a => a.Meetings)
            .HasForeignKey(m => m.PlaceId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Comment>()
            .HasOne(c => c.Meeting)
            .WithMany(m => m.Comments)
            .HasForeignKey(c => c.MeetingId);

        modelBuilder.Entity<UserMeeting>()
            .HasKey(x => new { x.UserId, x.MeetingId });

        modelBuilder.Entity<User>()
            .Property(u => u.ActivityStatus)
            .HasConversion(v => v.ToString(),
                v => Enum.Parse<UserActivityStatus>(v));
    }
}