using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Rls
{
    public partial class AdjustVisions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "normalized_name",
                table: "visions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "normalized_name",
                table: "visions",
                type: "text",
                nullable: true);
        }
    }
}
