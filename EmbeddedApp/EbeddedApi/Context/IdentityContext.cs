using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Context
{
    public class IdentityContext : IdentityDbContext<User, Role, Guid>
    {
            public IdentityContext(DbContextOptions<IdentityContext> options)
            : base(options)
        {
        }

          protected override void OnModelCreating(ModelBuilder builder)
        {
            // Customize the ASP.NET Core Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Core Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            
            base.OnModelCreating(builder);
       
        }
        
    }
}