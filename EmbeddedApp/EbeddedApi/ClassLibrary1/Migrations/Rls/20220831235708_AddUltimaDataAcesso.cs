using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class AddUltimaDataAcesso : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_menu_item_user_menu_UserMenuId",
                table: "menu_item");

            migrationBuilder.DropIndex(
                name: "IX_menu_item_UserMenuId",
                table: "menu_item");

            migrationBuilder.DropColumn(
                name: "UserMenuId",
                table: "menu_item");

            migrationBuilder.AddColumn<DateTime>(
                name: "data_ultimo_acesso",
                table: "user_pbi_rels",
                type: "timestamp with time zone",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "data_ultimo_acesso",
                table: "user_pbi_rels");

            migrationBuilder.AddColumn<Guid>(
                name: "UserMenuId",
                table: "menu_item",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_menu_item_UserMenuId",
                table: "menu_item",
                column: "UserMenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_menu_item_user_menu_UserMenuId",
                table: "menu_item",
                column: "UserMenuId",
                principalTable: "user_menu",
                principalColumn: "id");
        }
    }
}
