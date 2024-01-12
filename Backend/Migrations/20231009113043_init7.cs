using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class init7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMeetings_Meetings_MeetingId",
                table: "UserMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserMeetings_Users_UserId",
                table: "UserMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Meetings_MeetingId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_MeetingId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMeetings",
                table: "UserMeetings");

            migrationBuilder.DropColumn(
                name: "MeetingId",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "UserMeetings",
                newName: "UserFollowedMeetings");

            migrationBuilder.RenameIndex(
                name: "IX_UserMeetings_MeetingId",
                table: "UserFollowedMeetings",
                newName: "IX_UserFollowedMeetings_MeetingId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserFollowedMeetings",
                table: "UserFollowedMeetings",
                columns: new[] { "UserId", "MeetingId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowedMeetings_Meetings_MeetingId",
                table: "UserFollowedMeetings",
                column: "MeetingId",
                principalTable: "Meetings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserFollowedMeetings_Users_UserId",
                table: "UserFollowedMeetings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowedMeetings_Meetings_MeetingId",
                table: "UserFollowedMeetings");

            migrationBuilder.DropForeignKey(
                name: "FK_UserFollowedMeetings_Users_UserId",
                table: "UserFollowedMeetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserFollowedMeetings",
                table: "UserFollowedMeetings");

            migrationBuilder.RenameTable(
                name: "UserFollowedMeetings",
                newName: "UserMeetings");

            migrationBuilder.RenameIndex(
                name: "IX_UserFollowedMeetings_MeetingId",
                table: "UserMeetings",
                newName: "IX_UserMeetings_MeetingId");

            migrationBuilder.AddColumn<int>(
                name: "MeetingId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMeetings",
                table: "UserMeetings",
                columns: new[] { "UserId", "MeetingId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_MeetingId",
                table: "Users",
                column: "MeetingId");

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
    }
}
