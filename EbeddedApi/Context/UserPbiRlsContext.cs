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

        public virtual DbSet<Cliente> Cliente { get; set; }
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