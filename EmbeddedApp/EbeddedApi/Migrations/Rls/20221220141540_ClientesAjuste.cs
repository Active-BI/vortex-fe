using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class ClientesAjuste : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_visoes_cliente_visions_cliente_id",
                table: "visoes_cliente");

            migrationBuilder.CreateIndex(
                name: "IX_visoes_cliente_visao_id",
                table: "visoes_cliente",
                column: "visao_id");

            migrationBuilder.AddForeignKey(
                name: "FK_visoes_cliente_visions_visao_id",
                table: "visoes_cliente",
                column: "visao_id",
                principalTable: "visions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_visoes_cliente_visions_visao_id",
                table: "visoes_cliente");

            migrationBuilder.DropIndex(
                name: "IX_visoes_cliente_visao_id",
                table: "visoes_cliente");

            migrationBuilder.AddForeignKey(
                name: "FK_visoes_cliente_visions_cliente_id",
                table: "visoes_cliente",
                column: "cliente_id",
                principalTable: "visions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
