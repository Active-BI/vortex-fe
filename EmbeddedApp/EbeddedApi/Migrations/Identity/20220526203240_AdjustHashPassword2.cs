using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Identity
{
    public partial class AdjustHashPassword2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c08c01e5-e88a-4f54-80de-166496fff3b2"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c98dc354-25ed-42bf-ad8a-d61952b37240"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("eb7d8df8-89ce-4c53-bcca-79c5c5d616e9"));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("fb42e9f5-74b5-4171-ae3e-53ce2eac17ba"), "3024ba54-470b-4f5f-b3ad-67b8186977d6", "User", "USER" },
                    { new Guid("11e5c4d6-67bf-4022-8989-1aaeb590475b"), "aac0bc03-b7a7-4c3b-ab14-3fcdea756fef", "Coordinator", "COORDINATOR" },
                    { new Guid("c0f5fc66-5dde-4bfd-a185-5894e205e1c8"), "61b793a6-0f0e-480f-a2f1-78bd19c5f2d3", "Manager", "MANAGER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("11e5c4d6-67bf-4022-8989-1aaeb590475b"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("c0f5fc66-5dde-4bfd-a185-5894e205e1c8"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("fb42e9f5-74b5-4171-ae3e-53ce2eac17ba"));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("c08c01e5-e88a-4f54-80de-166496fff3b2"), "8c3734e7-88b8-4ae3-9ed2-b747f2ab740f", "User", "USER" },
                    { new Guid("eb7d8df8-89ce-4c53-bcca-79c5c5d616e9"), "4c7bf9f2-cd8b-4ab2-a959-1bc22ec759eb", "Coordinator", "COORDINATOR" },
                    { new Guid("c98dc354-25ed-42bf-ad8a-d61952b37240"), "35e2f929-ca85-4f4f-be4d-2c8a4bb367cf", "Manager", "MANAGER" }
                });
        }
    }
}
