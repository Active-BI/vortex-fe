using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Identity
{
    public partial class AddPerfilUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("5c9d96e1-4644-4aa7-b3e7-6390ab362d1c"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("73c77fcc-6a84-4c73-ad6c-c4333e2a3e50"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("e99e2f29-8501-48f4-8c88-ae868a0b137e"));

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

        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { new Guid("5c9d96e1-4644-4aa7-b3e7-6390ab362d1c"), "8e2d5a16-fdc9-47f8-a8bd-d1af0c056777", "User", "USER" },
                    { new Guid("73c77fcc-6a84-4c73-ad6c-c4333e2a3e50"), "3b2ffce8-9383-47b6-9b30-82aed423a8e1", "Coordinator", "COORDINATOR" },
                    { new Guid("e99e2f29-8501-48f4-8c88-ae868a0b137e"), "d5fd4085-3987-41d5-b003-dcd55e8e5658", "Manager", "MANAGER" }
                });
        }
    }
}
