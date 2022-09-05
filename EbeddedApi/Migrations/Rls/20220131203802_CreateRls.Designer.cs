﻿// <auto-generated />
using System;
using System.Collections.Generic;
using EbeddedApi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace EbeddedApi.Migrations.Rls
{
    [DbContext(typeof(UserPbiRlsContext))]
    [Migration("20220131203802_CreateRls")]
    partial class CreateRls
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("UserPbiRls", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("Empresa")
                        .HasColumnType("text")
                        .HasColumnName("empresa");

                    b.Property<List<string>>("Visao")
                        .HasColumnType("text[]")
                        .HasColumnName("visao");

                    b.HasKey("Id");

                    b.ToTable("user_pbi_rels");
                });
#pragma warning restore 612, 618
        }
    }
}
