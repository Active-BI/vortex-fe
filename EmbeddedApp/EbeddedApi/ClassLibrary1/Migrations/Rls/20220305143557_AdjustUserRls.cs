using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Rls
{
    public partial class AdjustUserRls : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "visao",
                table: "user_pbi_rels");

            migrationBuilder.AddColumn<string>(
                name: "Nome",
                table: "user_pbi_rels",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "identificacao",
                table: "user_pbi_rels",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nome",
                table: "user_pbi_rels");

            migrationBuilder.DropColumn(
                name: "identificacao",
                table: "user_pbi_rels");

            migrationBuilder.AddColumn<string[]>(
                name: "visao",
                table: "user_pbi_rels",
                type: "text[]",
                nullable: true);
        }
    }
}
