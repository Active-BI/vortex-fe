using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EbeddedApi.Migrations.Identity
{
    public partial class AdjustHashPassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("02da2c8e-db05-4ad2-9844-f3d2ec926541"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("3dfdc71e-9bf2-49fe-947e-bba6521d02fb"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("42163d28-5962-4c7f-a16b-88b46a75ef00"));

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetUsers");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("42163d28-5962-4c7f-a16b-88b46a75ef00"), "943c852d-3484-4341-b1f9-82afa8100d08", "User", "USER" },
                    { new Guid("3dfdc71e-9bf2-49fe-947e-bba6521d02fb"), "5dc26126-9b1b-4697-8f90-02d3a0b92ea3", "Coordinator", "COORDINATOR" },
                    { new Guid("02da2c8e-db05-4ad2-9844-f3d2ec926541"), "d6556d45-3764-4384-b283-bb07c8355ff2", "Manager", "MANAGER" }
                });
        }
    }
}
