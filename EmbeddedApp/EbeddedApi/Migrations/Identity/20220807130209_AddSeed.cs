using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EbeddedApi.Migrations.Identity
{
    public partial class AddSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("5c0cf41f-0ac9-4de7-a7e0-ed9fcd678d93"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c7117309-24d8-4a1c-b8b9-7cc543b65c18"));

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("ca21241b-a37d-4e6f-bbb6-26643d3cdd99"),
                column: "ConcurrencyStamp",
                value: "8341360b-dbc1-4c93-b94a-5eff837aed16");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { new Guid("6a203390-8389-49ca-aa0e-6a14ba7815bc"), "8a7e0766-4931-4e94-864f-249902ebce0a", "Admin", "Admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("6a203390-8389-49ca-aa0e-6a14ba7815bc"));

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("ca21241b-a37d-4e6f-bbb6-26643d3cdd99"),
                column: "ConcurrencyStamp",
                value: "e37859ab-c54b-45fd-91f0-b1295cabb219");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("5c0cf41f-0ac9-4de7-a7e0-ed9fcd678d93"), "719d36a4-1ea1-46d4-a186-041e02468a1a", "Coordinator", "COORDINATOR" },
                    { new Guid("c7117309-24d8-4a1c-b8b9-7cc543b65c18"), "30ac52e6-42be-4497-bd89-4244f10553d0", "Manager", "MANAGER" }
                });
        }
    }
}
