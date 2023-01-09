using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class AdjustMenuSubItemFK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_menu_sub_item_menu_item_id",
                table: "menu_sub_item");

            migrationBuilder.CreateIndex(
                name: "IX_menu_sub_item_menu_item_id",
                table: "menu_sub_item",
                column: "menu_item_id");

            migrationBuilder.AddForeignKey(
                name: "FK_menu_sub_item_menu_item_menu_item_id",
                table: "menu_sub_item",
                column: "menu_item_id",
                principalTable: "menu_item",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_menu_sub_item_menu_item_menu_item_id",
                table: "menu_sub_item");

            migrationBuilder.DropIndex(
                name: "IX_menu_sub_item_menu_item_id",
                table: "menu_sub_item");

            migrationBuilder.AddForeignKey(
                name: "FK_menu_sub_item_menu_item_id",
                table: "menu_sub_item",
                column: "id",
                principalTable: "menu_item",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
