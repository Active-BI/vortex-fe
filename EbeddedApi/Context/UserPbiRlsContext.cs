using EbeddedApi.Models;
using EbeddedApi.Models.Cliente;
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
        public virtual DbSet<UserMenu> UserMenus { get; set; }
        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<MenusCliente> MenusCliente { get; set; }
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
            
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.ClienteId);
                entity.ToTable("cliente");

                entity.Property(e => e.Name)
                    .HasColumnName("name");

            });
        }
    }
}