using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class init18 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NoteEntries");

            migrationBuilder.DropIndex(
                name: "IX_Notes_MeetingId",
                table: "Notes");

            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Notes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Notes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "CreationDate",
                table: "Notes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "IX_Notes_AuthorId",
                table: "Notes",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Notes_MeetingId",
                table: "Notes",
                column: "MeetingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_AuthorId",
                table: "Notes",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_AuthorId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_AuthorId",
                table: "Notes");

            migrationBuilder.DropIndex(
                name: "IX_Notes_MeetingId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "Notes");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Notes");

            migrationBuilder.CreateTable(
                name: "NoteEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AuthorId = table.Column<int>(type: "integer", nullable: false),
                    NoteId = table.Column<int>(type: "integer", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreationDate = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NoteEntries_Notes_NoteId",
                        column: x => x.NoteId,
                        principalTable: "Notes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NoteEntries_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notes_MeetingId",
                table: "Notes",
                column: "MeetingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntries_AuthorId",
                table: "NoteEntries",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_NoteEntries_NoteId",
                table: "NoteEntries",
                column: "NoteId");
        }
    }
}
