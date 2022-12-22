using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Identity
{
    public partial class AddPerfilUser2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("053bd2cf-aa3f-4c95-a3a9-27d3c704d49e"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("5174edb3-8c6e-4f7e-9409-f6afa9fa949a"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("bbc18e4b-a8ea-49d5-a984-b970a36e0dea"));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("ca21241b-a37d-4e6f-bbb6-26643d3cdd99"), "e37859ab-c54b-45fd-91f0-b1295cabb219", "User", "USER" },
                    { new Guid("5c0cf41f-0ac9-4de7-a7e0-ed9fcd678d93"), "719d36a4-1ea1-46d4-a186-041e02468a1a", "Coordinator", "COORDINATOR" },
                    { new Guid("c7117309-24d8-4a1c-b8b9-7cc543b65c18"), "30ac52e6-42be-4497-bd89-4244f10553d0", "Manager", "MANAGER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("5c0cf41f-0ac9-4de7-a7e0-ed9fcd678d93"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c7117309-24d8-4a1c-b8b9-7cc543b65c18"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("ca21241b-a37d-4e6f-bbb6-26643d3cdd99"));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("bbc18e4b-a8ea-49d5-a984-b970a36e0dea"), "2cad049a-c460-4fde-a8e9-175818d44e77", "User", "USER" },
                    { new Guid("053bd2cf-aa3f-4c95-a3a9-27d3c704d49e"), "cffb2f1a-676c-44ab-aa6a-58c6a00c178d", "Coordinator", "COORDINATOR" },
                    { new Guid("5174edb3-8c6e-4f7e-9409-f6afa9fa949a"), "48affe12-fee9-4096-b3f3-6fddd933f83c", "Manager", "MANAGER" }
                });
        }
    }
}
