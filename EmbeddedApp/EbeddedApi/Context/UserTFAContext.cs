using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Models.TFA;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Context
{
    public class UserTFAContext: DbContext
    {
          public UserTFAContext(DbContextOptions<UserTFAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserTFA> UserTFA { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTFA>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("user_tfa_configuration");

                entity.Property(e => e.Email)
                    .HasColumnName("email");

                entity.Property(e => e.TFASecretKey)
                    .HasColumnName("tfa_secret_key");

                entity.Property(e => e.TFASettedUp)
                    .HasColumnName("tfa_setted_up");

            });
        }
    }
}