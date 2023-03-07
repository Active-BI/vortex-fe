using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infra.Migrations.Rls
{
    public partial class initialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user_pbi_rels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    identificacao = table.Column<string>(type: "text", nullable: false),
                    empresa = table.Column<string>(type: "text", nullable: false),
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
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visions", x => x.Id);
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

            migrationBuilder.CreateIndex(
                name: "IX_user_visions_user_id",
                table: "user_visions",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_user_visions_vision_id",
                table: "user_visions",
                column: "vision_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user_visions");

            migrationBuilder.DropTable(
                name: "user_pbi_rels");

            migrationBuilder.DropTable(
                name: "visions");
        }
    }
}
