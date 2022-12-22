using EbeddedApi.Models;
using EbeddedApi.Models.Menu;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Context
{
  
    public partial class MenuItemContext : DbContext
    {
      
        public MenuItemContext(DbContextOptions<MenuItemContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserPbiRls> UserPbiRls { get; set; }
        public virtual DbSet<MenuItem> MenuItems { get; set; }
        public virtual DbSet<MenuSubItem> MenuSubItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

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
        }
    }
}