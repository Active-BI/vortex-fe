using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class AddUserMenuContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    context = table.Column<string>(type: "text", nullable: true),
                    UserMenuId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_item", x => x.id);
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
                        onDelete: ReferentialAction.SetNull);
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
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_user_menu_user_pbi_rels_user_pbi_rels_id",
                        column: x => x.user_pbi_rels_id,
                        principalTable: "user_pbi_rels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_menu_item_UserMenuId",
                table: "menu_item",
                column: "UserMenuId");

            migrationBuilder.CreateIndex(
                name: "IX_menu_sub_item_menu_item_id",
                table: "menu_sub_item",
                column: "menu_item_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_menu_menu_item_id",
                table: "user_menu",
                column: "menu_item_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_menu_user_pbi_rels_id",
                table: "user_menu",
                column: "user_pbi_rels_id");

            migrationBuilder.AddForeignKey(
                name: "FK_menu_item_user_menu_UserMenuId",
                table: "menu_item",
                column: "UserMenuId",
                principalTable: "user_menu",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_menu_item_user_menu_UserMenuId",
                table: "menu_item");

            migrationBuilder.DropTable(
                name: "menu_sub_item");

            migrationBuilder.DropTable(
                name: "user_menu");

            migrationBuilder.DropTable(
                name: "menu_item");
        }
    }
}
