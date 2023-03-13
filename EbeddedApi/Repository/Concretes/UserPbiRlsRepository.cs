using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Auth;
using EbeddedApi.Services.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.PowerBI.Api;
using Repository.Interfaces;

namespace Repository.Concretes
{
    public class UserPbiRlsRepository : IUserPbiRlsRepository
    {
        private readonly UserPbiRlsContext _userPbiContext;

        public UserPbiRlsRepository(
               UserPbiRlsContext userPbiContext
            )
        {
            this._userPbiContext = userPbiContext;
        }
        public async Task AddAsync(UserPbiRls entity)
        {
            try
            {

                await this._userPbiContext.AddAsync(entity);
                await this._userPbiContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new UserNotSaved("Erro ao salvar usuário");
            }

        }

        public async Task Delete(UserPbiRls entity)
        {
            try
            {

                this._userPbiContext.Remove(entity);
                await this._userPbiContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new UserDeleteError("Erro ao deletar usuário");
            }

        }


        public async Task<UserPbiRls> GetById(Guid id)
        {
            try
            {

                var user = await this.GetFromAdmin();
                var result = user.FirstOrDefault(user => user.Id == id);

                return result;
            }
            catch (Exception)
            {
                throw new UserGetError("Erro ao consultar Id do usuário");
            }
        }

        public async Task<IEnumerable<UserPbiRls>> GetFromAdmin()
        {
            try
            {

                var result = await this._userPbiContext.UserPbiRls.AsNoTracking()
                                                 //  .Include(x => x.UserVisions)
                                                 //  .ThenInclude(us => us.Vision)
                                                 .ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new UserGetError("Erro ao consultar usuários");
            }
        }

        public async Task Put(UserPbiRls user)
        {
            try
            {
                this._userPbiContext.UserPbiRls.Update(user);
                await this._userPbiContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new UserNotSaved("Erro ao salvar usuário");
            }
        }
    }
}
