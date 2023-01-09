using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Rls
{
    public partial class AddPerfilUser5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Perfil",
                table: "user_pbi_rels",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Perfil",
                table: "user_pbi_rels");
        }
    }
}
