using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Rls
{
    public partial class AddSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.InsertData(
            //     table: "user_pbi_rels",
            //     columns: new[] { "Id", "email", "empresa", "identificacao", "Nome", "Perfil" },
            //     values: new object[] { new Guid("40baa252-e009-431c-85e1-d43f8bd2d684"), "call.thiago@gmail.com", null, "1053433", "Thiago Caldas", "6a203390-8389-49ca-aa0e-6a14ba7815bc" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DeleteData(
            //     table: "user_pbi_rels",
            //     keyColumn: "Id",
            //     keyValue: new Guid("40baa252-e009-431c-85e1-d43f8bd2d684"));
        }
    }
}
