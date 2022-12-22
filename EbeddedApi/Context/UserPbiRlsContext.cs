using System;
using EbeddedApi.Models;
using EbeddedApi.Models.Cliente;
using EbeddedApi.Models.Menu;
using EbeddedApi.Services;
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
        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<MenusCliente> MenusCliente { get; set; }
        public virtual DbSet<VisoesCliente> VisoesCliente { get; set; }
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
                
                entity.Property(e => e.EmailContato)
                    .HasColumnName("email_contato")
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

            
            modelBuilder.Entity<MenusCliente>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("menus_cliente");

                entity.Property(e => e.MenuId)
                    .HasColumnName("menu_id");

                entity.Property(e => e.ClienteId)
                    .HasColumnName("cliente_id");

                entity.HasOne(e => e.MenuItem)
                    .WithMany()
                    .HasForeignKey(e => e.MenuId);

                entity.HasOne(e => e.Cliente)
                    .WithMany()
                    .HasForeignKey(e => e.ClienteId);

            });

            modelBuilder.Entity<VisoesCliente>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("visoes_cliente");

                entity.Property(e => e.VisaoId)
                    .HasColumnName("visao_id");

                entity.Property(e => e.ClienteId)
                    .HasColumnName("cliente_id");

                entity.HasOne(e => e.Cliente)
                    .WithMany()
                    .HasForeignKey(e => e.ClienteId);

                entity.HasOne(e => e.Vision)
                    .WithMany()
                    .HasForeignKey(e => e.VisaoId);
            });
            
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.ClienteId);
                entity.ToTable("cliente");

                entity.Property(e => e.Name)
                    .HasColumnName("name");

            });
        }

        public static implicit operator UserPbiRlsContext(ClienteService v)
        {
            throw new NotImplementedException();
        }
    }
}