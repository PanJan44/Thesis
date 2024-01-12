using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meeting_Users_UserId",
                table: "Meeting");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeeting_Meeting_MeetingId",
                table: "UserMeeting");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeeting_Users_UserId",
                table: "UserMeeting");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Addresses_AddressPlaceId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_AddressPlaceId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMeeting",
                table: "UserMeeting");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meeting",
                table: "Meeting");

            migrationBuilder.DropIndex(
                name: "IX_Meeting_UserId",
                table: "Meeting");

            migrationBuilder.DropColumn(
                name: "AddressPlaceId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Meeting");

            migrationBuilder.RenameTable(
                name: "UserMeeting",
                newName: "UserMeetings");

            migrationBuilder.RenameTable(
                name: "Meeting",
                newName: "Meetings");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeeting_MeetingId",
                table: "UserMeetings",
                newName: "IX_UserMeetings_MeetingId");

            migrationBuilder.AddColumn<int>(
                name: "MeetingId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Addresses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlaceName",
                table: "Addresses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlaceUrl",
                table: "Addresses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StreetName",
                table: "Addresses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "StreetNumber",
                table: "Addresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Meetings",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "LocationPlaceId",
                table: "Meetings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "OrganizerId",
                table: "Meetings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMeetings",
                table: "UserMeetings",
                columns: new[] { "UserId", "MeetingId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meetings",
                table: "Meetings",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Likes = table.Column<int>(type: "integer", nullable: false),
                    Dislikes = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    MeetingId = table.Column<int>(type: "integer", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Meetings_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meetings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comment_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Picture",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Picture", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Picture_Meetings_Id",
                        column: x => x.Id,
                        principalTable: "Meetings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dislikers",
                columns: table => new
                {
                    DislikerId = table.Column<int>(type: "integer", nullable: false),
                    CommentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dislikers", x => new { x.DislikerId, x.CommentId });
                    table.ForeignKey(
                        name: "FK_Dislikers_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dislikers_Users_DislikerId",
                        column: x => x.DislikerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Likers",
                columns: table => new
                {
                    LikerId = table.Column<int>(type: "integer", nullable: false),
                    CommentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likers", x => new { x.LikerId, x.CommentId });
                    table.ForeignKey(
                        name: "FK_Likers_Comment_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comment",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likers_Users_LikerId",
                        column: x => x.LikerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_MeetingId",
                table: "Users",
                column: "MeetingId");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_LocationPlaceId",
                table: "Meetings",
                column: "LocationPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_OrganizerId",
                table: "Meetings",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_MeetingId",
                table: "Comment",
                column: "MeetingId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_UserId",
                table: "Comment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Dislikers_CommentId",
                table: "Dislikers",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_Likers_CommentId",
                table: "Likers",
                column: "CommentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Addresses_LocationPlaceId",
                table: "Meetings",
                column: "LocationPlaceId",
                principalTable: "Addresses",
                principalColumn: "PlaceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Users_OrganizerId",
                table: "Meetings",
                column: "OrganizerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeetings_Meetings_MeetingId",
                table: "UserMeetings",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeetings_Users_UserId",
                table: "UserMeetings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Meetings_MeetingId",
                table: "Users",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Addresses_LocationPlaceId",
                table: "Meetings");

            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Users_OrganizerId",
                table: "Meetings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeetings_Meetings_MeetingId",
                table: "UserMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeetings_Users_UserId",
                table: "UserMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Meetings_MeetingId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Dislikers");

            migrationBuilder.DropTable(
                name: "Likers");

            migrationBuilder.DropTable(
                name: "Picture");

            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropIndex(
                name: "IX_Users_MeetingId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMeetings",
                table: "UserMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Meetings",
                table: "Meetings");

            migrationBuilder.DropIndex(
                name: "IX_Meetings_LocationPlaceId",
                table: "Meetings");

            migrationBuilder.DropIndex(
                name: "IX_Meetings_OrganizerId",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "MeetingId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "City",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "PlaceName",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "PlaceUrl",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "StreetName",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "StreetNumber",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "LocationPlaceId",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "OrganizerId",
                table: "Meetings");

            migrationBuilder.RenameTable(
                name: "UserMeetings",
                newName: "UserMeeting");

            migrationBuilder.RenameTable(
                name: "Meetings",
                newName: "Meeting");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeetings_MeetingId",
                table: "UserMeeting",
                newName: "IX_UserMeeting_MeetingId");

            migrationBuilder.AddColumn<string>(
                name: "AddressPlaceId",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Meeting",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Meeting",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMeeting",
                table: "UserMeeting",
                columns: new[] { "UserId", "MeetingId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Meeting",
                table: "Meeting",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressPlaceId",
                table: "Users",
                column: "AddressPlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Meeting_UserId",
                table: "Meeting",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meeting_Users_UserId",
                table: "Meeting",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeeting_Meeting_MeetingId",
                table: "UserMeeting",
                column: "MeetingId",
                principalTable: "Meeting",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserMeeting_Users_UserId",
                table: "UserMeeting",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Addresses_AddressPlaceId",
                table: "Users",
                column: "AddressPlaceId",
                principalTable: "Addresses",
                principalColumn: "PlaceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
