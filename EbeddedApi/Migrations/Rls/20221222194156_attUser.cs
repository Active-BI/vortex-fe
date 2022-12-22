using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class attUser : Migration
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
                name: "menu_item",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    path = table.Column<string>(type: "text", nullable: true),
                    title = table.Column<string>(type: "text", nullable: true),
                    long_title = table.Column<string>(type: "text", nullable: true),
                    icon = table.Column<string>(type: "text", nullable: true),
                    @class = table.Column<string>(name: "class", type: "text", nullable: true),
                    context = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_item", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_pbi_rels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    email = table.Column<string>(type: "text", nullable: true),
                    Nome = table.Column<string>(type: "text", nullable: true),
                    identificacao = table.Column<string>(type: "text", nullable: true),
                    empresa = table.Column<string>(type: "text", nullable: true),
                    Perfil = table.Column<string>(type: "text", nullable: true),
                    email_contato = table.Column<string>(type: "text", nullable: true),
                    data_ultimo_acesso = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_pbi_rels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "visions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "menu_sub_item",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    path = table.Column<string>(type: "text", nullable: true),
                    title = table.Column<string>(type: "text", nullable: true),
                    long_title = table.Column<string>(type: "text", nullable: true),
                    icon = table.Column<string>(type: "text", nullable: true),
                    @class = table.Column<string>(name: "class", type: "text", nullable: true),
                    context = table.Column<string>(type: "text", nullable: true),
                    menu_item_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_sub_item", x => x.id);
                    table.ForeignKey(
                        name: "FK_menu_sub_item_menu_item_menu_item_id",
                        column: x => x.menu_item_id,
                        principalTable: "menu_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "user_menu",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_pbi_rels_id = table.Column<Guid>(type: "uuid", nullable: false),
                    menu_item_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_menu", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_menu_menu_item_menu_item_id",
                        column: x => x.menu_item_id,
                        principalTable: "menu_item",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_menu_user_pbi_rels_user_pbi_rels_id",
                        column: x => x.user_pbi_rels_id,
                        principalTable: "user_pbi_rels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_visions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    vision_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_visions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user_visions_user_pbi_rels_user_id",
                        column: x => x.user_id,
                        principalTable: "user_pbi_rels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_visions_visions_vision_id",
                        column: x => x.vision_id,
                        principalTable: "visions",
                        principalColumn: "Id",
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
                        name: "FK_visoes_cliente_visions_visao_id",
                        column: x => x.visao_id,
                        principalTable: "visions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_menu_sub_item_menu_item_id",
                table: "menu_sub_item",
                column: "menu_item_id");

            migrationBuilder.CreateIndex(
                name: "IX_menus_cliente_cliente_id",
                table: "menus_cliente",
                column: "cliente_id");

            migrationBuilder.CreateIndex(
                name: "IX_menus_cliente_menu_id",
                table: "menus_cliente",
                column: "menu_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_menu_menu_item_id",
                table: "user_menu",
                column: "menu_item_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_menu_user_pbi_rels_id",
                table: "user_menu",
                column: "user_pbi_rels_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_visions_user_id",
                table: "user_visions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_visions_vision_id",
                table: "user_visions",
                column: "vision_id");

            migrationBuilder.CreateIndex(
                name: "IX_visoes_cliente_cliente_id",
                table: "visoes_cliente",
                column: "cliente_id");

            migrationBuilder.CreateIndex(
                name: "IX_visoes_cliente_visao_id",
                table: "visoes_cliente",
                column: "visao_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "menu_sub_item");

            migrationBuilder.DropTable(
                name: "menus_cliente");

            migrationBuilder.DropTable(
                name: "user_menu");

            migrationBuilder.DropTable(
                name: "user_visions");

            migrationBuilder.DropTable(
                name: "visoes_cliente");

            migrationBuilder.DropTable(
                name: "menu_item");

            migrationBuilder.DropTable(
                name: "user_pbi_rels");

            migrationBuilder.DropTable(
                name: "cliente");

            migrationBuilder.DropTable(
                name: "visions");
        }
    }
}
