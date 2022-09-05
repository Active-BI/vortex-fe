using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Rls
{
    public partial class AdjustRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_user_visions_user_id",
                table: "user_visions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_visions_vision_id",
                table: "user_visions",
                column: "vision_id");

            migrationBuilder.AddForeignKey(
                name: "FK_user_visions_user_pbi_rels_user_id",
                table: "user_visions",
                column: "user_id",
                principalTable: "user_pbi_rels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_visions_visions_vision_id",
                table: "user_visions",
                column: "vision_id",
                principalTable: "visions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_user_visions_user_pbi_rels_user_id",
                table: "user_visions");

            migrationBuilder.DropForeignKey(
                name: "FK_user_visions_visions_vision_id",
                table: "user_visions");

            migrationBuilder.DropIndex(
                name: "IX_user_visions_user_id",
                table: "user_visions");

            migrationBuilder.DropIndex(
                name: "IX_user_visions_vision_id",
                table: "user_visions");
        }
    }
}
