using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class Clientes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cliente",
                columns: table => new
                {
                    ClienteId = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cliente", x => x.ClienteId);
                });

            migrationBuilder.CreateTable(
                name: "menus_cliente",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    cliente_id = table.Column<Guid>(type: "uuid", nullable: false),
                    menu_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menus_cliente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_menus_cliente_cliente_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "cliente",
                        principalColumn: "ClienteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_menus_cliente_menu_item_menu_id",
                        column: x => x.menu_id,
                        principalTable: "menu_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visoes_cliente",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    cliente_id = table.Column<Guid>(type: "uuid", nullable: false),
                    visao_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visoes_cliente", x => x.Id);
                    table.ForeignKey(
                        name: "FK_visoes_cliente_cliente_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "cliente",
                        principalColumn: "ClienteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_visoes_cliente_visions_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "visions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_menus_cliente_cliente_id",
                table: "menus_cliente",
                column: "cliente_id");

            migrationBuilder.CreateIndex(
                name: "IX_menus_cliente_menu_id",
                table: "menus_cliente",
                column: "menu_id");

            migrationBuilder.CreateIndex(
                name: "IX_visoes_cliente_cliente_id",
                table: "visoes_cliente",
                column: "cliente_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "menus_cliente");

            migrationBuilder.DropTable(
                name: "visoes_cliente");

            migrationBuilder.DropTable(
                name: "cliente");
        }
    }
}
