using EbeddedApi.Models;
using EbeddedApi.Models.Cliente;
using EbeddedApi.Models.Menu;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Context
{
  
    public partial class VisionContext : DbContext
    {
      
        public VisionContext(DbContextOptions<VisionContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Vision> Visions { get; set; }
        public virtual DbSet<UserVisions> UserVisions { get; set; }
        public virtual DbSet<VisoesCliente> VisoesCliente { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

        }
    }
};