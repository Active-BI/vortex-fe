using System;
using Microsoft.AspNetCore.Identity;

namespace EbeddedApi.Models.Auth
{
    public class User : IdentityUser<Guid>
    {
        public User()
        {
            Id = Guid.NewGuid();
        }
    }
}