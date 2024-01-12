using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class init16 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Addresses_LocationPlaceId",
                table: "Meetings");

            migrationBuilder.RenameColumn(
                name: "LocationPlaceId",
                table: "Meetings",
                newName: "PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Meetings_LocationPlaceId",
                table: "Meetings",
                newName: "IX_Meetings_PlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Addresses_PlaceId",
                table: "Meetings",
                column: "PlaceId",
                principalTable: "Addresses",
                principalColumn: "PlaceId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Addresses_PlaceId",
                table: "Meetings");

            migrationBuilder.RenameColumn(
                name: "PlaceId",
                table: "Meetings",
                newName: "LocationPlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Meetings_PlaceId",
                table: "Meetings",
                newName: "IX_Meetings_LocationPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Addresses_LocationPlaceId",
                table: "Meetings",
                column: "LocationPlaceId",
                principalTable: "Addresses",
                principalColumn: "PlaceId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
