using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class MenuItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "path",
                table: "menu_item",
                newName: "type");

            migrationBuilder.AddColumn<string>(
                name: "link",
                table: "menu_item",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "link",
                table: "menu_item");

            migrationBuilder.RenameColumn(
                name: "type",
                table: "menu_item",
                newName: "path");
        }
    }
}
