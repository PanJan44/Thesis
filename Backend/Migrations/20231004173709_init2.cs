using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Users_UserId",
                table: "Addresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "NickName",
                table: "Users",
                newName: "Nickname");

            migrationBuilder.AddColumn<string>(
                name: "ActivityStatus",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AddressPlaceId",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlaceId",
                table: "Addresses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "PlaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_AddressPlaceId",
                table: "Users",
                column: "AddressPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Addresses_AddressPlaceId",
                table: "Users",
                column: "AddressPlaceId",
                principalTable: "Addresses",
                principalColumn: "PlaceId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Addresses_AddressPlaceId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_AddressPlaceId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "ActivityStatus",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AddressPlaceId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PlaceId",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "Nickname",
                table: "Users",
                newName: "NickName");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Addresses",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Addresses",
                table: "Addresses",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Users_UserId",
                table: "Addresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
