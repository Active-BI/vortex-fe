using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Models.Auth;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.PowerBI.Api;
using Repository.Interfaces;

namespace Repository.Concretes
{
    public class IdentityRepository : IIdentityRepository
    {
        private readonly IdentityContext _identityContext;
        public IdentityRepository(IdentityContext identityContext)
        {
            _identityContext = identityContext;
        }

        public async Task<IEnumerable<User>> Get()
        {
            try
            {
                var user = await this._identityContext.Users.ToListAsync();
                return user;
            }
            catch (Exception)
            {
                throw new UserGetError("Erro ao consultar usuários cadastrados");
            }
        }

        public async Task Add(User user)
        {
            try
            {

                await this._identityContext.Users.AddAsync(user);
                this._identityContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new UserNotSaved("Erro ao cadastrar usuário");
            }
        }


    }
}
