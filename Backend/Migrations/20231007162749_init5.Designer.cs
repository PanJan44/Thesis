﻿// <auto-generated />
using System;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231007162749_init5")]
    partial class init5
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Domain.Entities.Address", b =>
                {
                    b.Property<string>("PlaceId")
                        .HasColumnType("text");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PlaceName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PlaceUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StreetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("StreetNumber")
                        .HasColumnType("integer");

                    b.HasKey("PlaceId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Dislikes")
                        .HasColumnType("integer");

                    b.Property<int>("Likes")
                        .HasColumnType("integer");

                    b.Property<int>("MeetingId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MeetingId");

                    b.HasIndex("UserId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Dislikers", b =>
                {
                    b.Property<int>("DislikerId")
                        .HasColumnType("integer");

                    b.Property<int>("CommentId")
                        .HasColumnType("integer");

                    b.HasKey("DislikerId", "CommentId");

                    b.HasIndex("CommentId");

                    b.ToTable("Dislikers");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Likers", b =>
                {
                    b.Property<int>("LikerId")
                        .HasColumnType("integer");

                    b.Property<int>("CommentId")
                        .HasColumnType("integer");

                    b.HasKey("LikerId", "CommentId");

                    b.HasIndex("CommentId");

                    b.ToTable("Likers");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Meeting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("End")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LocationPlaceId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("OrganizerId")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("Start")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("LocationPlaceId");

                    b.HasIndex("OrganizerId");

                    b.ToTable("Meetings");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Picture", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Picture");
                });

            modelBuilder.Entity("Backend.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Achievements")
                        .HasColumnType("text");

                    b.Property<string>("ActivityStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<int?>("MeetingId")
                        .HasColumnType("integer");

                    b.Property<string>("Nickname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("YearsOfExperience")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MeetingId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Backend.Domain.Entities.UserMeeting", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<int>("MeetingId")
                        .HasColumnType("integer");

                    b.HasKey("UserId", "MeetingId");

                    b.HasIndex("MeetingId");

                    b.ToTable("UserMeetings");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Comment", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Meeting", "Meeting")
                        .WithMany()
                        .HasForeignKey("MeetingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meeting");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Dislikers", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Comment", "Comment")
                        .WithMany("Dislikers")
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "Disliker")
                        .WithMany()
                        .HasForeignKey("DislikerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Comment");

                    b.Navigation("Disliker");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Likers", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Comment", "Comment")
                        .WithMany("Likers")
                        .HasForeignKey("CommentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "Liker")
                        .WithMany()
                        .HasForeignKey("LikerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Comment");

                    b.Navigation("Liker");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Meeting", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Address", "Location")
                        .WithMany()
                        .HasForeignKey("LocationPlaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "Organizer")
                        .WithMany("OrganizedMeetings")
                        .HasForeignKey("OrganizerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");

                    b.Navigation("Organizer");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Picture", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Meeting", "Meeting")
                        .WithOne("Picture")
                        .HasForeignKey("Backend.Domain.Entities.Picture", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meeting");
                });

            modelBuilder.Entity("Backend.Domain.Entities.User", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Meeting", null)
                        .WithMany("Participants")
                        .HasForeignKey("MeetingId");
                });

            modelBuilder.Entity("Backend.Domain.Entities.UserMeeting", b =>
                {
                    b.HasOne("Backend.Domain.Entities.Meeting", "Meeting")
                        .WithMany()
                        .HasForeignKey("MeetingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Domain.Entities.User", "User")
                        .WithMany("FollowedOrParticipatedInMeetings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meeting");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Comment", b =>
                {
                    b.Navigation("Dislikers");

                    b.Navigation("Likers");
                });

            modelBuilder.Entity("Backend.Domain.Entities.Meeting", b =>
                {
                    b.Navigation("Participants");

                    b.Navigation("Picture");
                });

            modelBuilder.Entity("Backend.Domain.Entities.User", b =>
                {
                    b.Navigation("FollowedOrParticipatedInMeetings");

                    b.Navigation("OrganizedMeetings");
                });
#pragma warning restore 612, 618
        }
    }
}
