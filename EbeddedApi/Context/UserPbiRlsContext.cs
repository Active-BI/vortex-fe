using System;
using EbeddedApi.Models;
using EbeddedApi.Models.Menu;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Context
{
  
    public partial class UserPbiRlsContext : DbContext
    {
      
        public UserPbiRlsContext(DbContextOptions<UserPbiRlsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserPbiRls> UserPbiRls { get; set; }
        public virtual DbSet<Vision> Visions { get; set; }
        public virtual DbSet<UserVisions> UserVisions { get; set; }
        public virtual DbSet<MenuItem> MenuItems { get; set; }
        public virtual DbSet<MenuSubItem> MenuSubItems { get; set; }
        public virtual DbSet<UserMenu> UserMenus { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPbiRls>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("user_pbi_rels");

                entity.Property(e => e.Email)
                    .HasColumnName("email");

                entity.Property(e => e.Empresa)
                    .HasColumnName("empresa");

                entity.Property(e => e.Identificacao)
                    .HasColumnName("identificacao");

                 entity.Property(e => e.Nome)
                    .HasColumnName("Nome");

                entity.Property(e => e.Perfil)
                    .HasColumnName("Perfil")
                    .IsRequired(false);

                  entity.Property(e => e.DataUltimoAcesso)
                    .HasColumnName("data_ultimo_acesso")
                    .IsRequired(false);
                 
                 entity.HasMany(e => e.UserVisions)
                        .WithOne()
                        .HasForeignKey(e => e.UserId);

                 entity.HasMany(e => e.UserMenus)
                        .WithOne()
                        .HasForeignKey(e => e.UserPbiRelsId);
            });

            modelBuilder.Entity<Vision>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("visions");

                entity.Property(e => e.Name)
                    .HasColumnName("name");

                // entity.Property(e => e.NormalizedName)
                //     .HasColumnName("normalized_name");
            });

            modelBuilder.Entity<UserVisions>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("user_visions");

                entity.Property(e => e.UserId)
                    .HasColumnName("user_id");

                entity.Property(e => e.VisionId)
                    .HasColumnName("vision_id");
                
                entity.HasOne(e => e.Vision)
                        .WithMany()
                        .HasForeignKey(e => e.VisionId);
            });

            modelBuilder.Entity<MenuItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("menu_item");

                entity.Property(e => e.Id)
                    .HasColumnName("id");

                entity.Property(e => e.Path)
                    .HasColumnName("path");

                entity.Property(e => e.Title)
                    .HasColumnName("title");

                entity.Property(e => e.LongTitle)
                    .HasColumnName("long_title");

                entity.Property(e => e.Icon)
                    .HasColumnName("icon");

                entity.Property(e => e.Class)
                    .HasColumnName("class");
                
                entity.Property(e => e.Context)
                    .HasColumnName("context");

                entity.HasMany(e => e.MenuSubItens)
                        .WithOne()
                        .HasForeignKey(e => e.MenuItemId);
                        
            });

            modelBuilder.Entity<MenuSubItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("menu_sub_item");

                entity.Property(e => e.Id)
                    .HasColumnName("id");

                entity.Property(e => e.Path)
                    .HasColumnName("path");

                entity.Property(e => e.Title)
                    .HasColumnName("title");

                entity.Property(e => e.LongTitle)
                    .HasColumnName("long_title");

                entity.Property(e => e.Icon)
                    .HasColumnName("icon");

                entity.Property(e => e.Class)
                    .HasColumnName("class");
                
                entity.Property(e => e.Context)
                    .HasColumnName("context");

                entity.Property(e => e.MenuItemId)
                    .HasColumnName("menu_item_id");
                
              
            });

            modelBuilder.Entity<UserMenu>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("user_menu");

                entity.Property(e => e.Id)
                    .HasColumnName("id");

                entity.Property(e => e.UserPbiRelsId)
                    .HasColumnName("user_pbi_rels_id");

                entity.Property(e => e.MenuItemId)
                    .HasColumnName("menu_item_id");
                
                entity.HasOne(e => e.Menu)
                        .WithMany()
                        .HasForeignKey(e => e.MenuItemId);
            });

        // Data Seeders

        //  modelBuilder.Entity<UserPbiRls>().HasData(
        //     new UserPbiRls() { Id = Guid.Parse("40baa252-e009-431c-85e1-d43f8bd2d684"), 
        //                        Email = "call.thiago@gmail.com",
        //                        Nome = "Thiago Caldas",
        //                        Identificacao = "1053433",
        //                        Perfil = "6a203390-8389-49ca-aa0e-6a14ba7815bc" }

        //     );

        }
    }
}