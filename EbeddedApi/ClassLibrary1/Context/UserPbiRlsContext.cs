using EbeddedApi.Models;
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
        public virtual DbSet<Perfil> Perfil { get; set; }
        public virtual DbSet<UserVisions> UserVisions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserPbiRls>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("user_pbi_rels");

                entity.Property(e => e.Email)
                    .HasColumnName("email");

                entity.Property(e => e.Empresa)
                    .HasColumnName("empresa")
                    .IsRequired(false);

                entity.Property(e => e.Identificacao)
                    .HasColumnName("identificacao");

                entity.Property(e => e.Nome)
                   .HasColumnName("Nome");

                entity.Property(e => e.PerfilId)
                    .HasColumnName("perfil_id");

                entity.Property(e => e.EmailContato)
                    .HasColumnName("email_contato")
                    .IsRequired(false);

                entity.Property(e => e.DataUltimoAcesso)
                  .HasColumnName("data_ultimo_acesso")
                  .IsRequired(false);

                // entity.HasOne(e => e.Perfil)
                //     .WithMany()
                //     .HasForeignKey(e => e.PerfilId);

                entity.HasMany(e => e.UserVisions)
                       .WithOne()
                       .HasForeignKey(e => e.UserId);

            });

            modelBuilder.Entity<Perfil>(entity =>
            {
                entity.ToTable("perfil");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Vision>(entity =>
           {
               entity.HasKey(e => e.Id);
               entity.ToTable("visions");

               entity.Property(e => e.Name)
                   .HasColumnName("name");
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

        }
    }
}