using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.PowerBI.Api;
using Repository.Interfaces;

namespace Repository.Concretes
{
    public class RolesRepository : IRolesRepository
    {
        private readonly IdentityContext _identityContext;
        public RolesRepository(IdentityContext identityContext)
        {
            _identityContext = identityContext;
        }

        public IEnumerable<UserPbiRls> joinRoles(IEnumerable<UserPbiRls> Users)
        {
            var result = from user in Users
                         select new UserPbiRls()
                         {
                             Id = user.Id,
                             Nome = user.Nome,
                             Email = user.Email,
                             EmailContato = user.EmailContato,
                             Empresa = user.Empresa,
                             Identificacao = user.Identificacao,
                             PerfilId = user.PerfilId,
                             DataUltimoAcesso = user.DataUltimoAcesso
                         };
            return result;
        }
    }
}
