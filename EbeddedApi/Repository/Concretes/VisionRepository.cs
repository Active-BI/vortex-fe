using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Models.Auth;
using EbeddedApi.Services.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.PowerBI.Api;
using Models.Models.Dtos;
using Repository.Interfaces;

namespace Repository.Concretes
{
    public class VisionRepository : IVisionRepository
    {
        private readonly UserPbiRlsContext _userPbiContext;
        public VisionRepository(UserPbiRlsContext userPbiRlsContext)
        {
            _userPbiContext = userPbiRlsContext;
        }

        public List<UserVisions> GetById(Guid id)
        {
            try
            {

                var result = this._userPbiContext.UserVisions
                             .Where(x => x.UserId == id)
                             .AsNoTracking()
                             .ToList();
                return result;
            }
            catch (Exception)
            {
                throw new VisionGetError("Erro ao consultar Id da visão");
            }
        }
        public IEnumerable<Vision> Get()
        {
            try
            {

                var result = this._userPbiContext.Visions
                                    .AsNoTracking()
                                    .OrderBy(x => x.Name)
                                    .ToList();
                return result;
            }
            catch (Exception)
            {
                throw new VisionGetError("Erro ao consultar visões");
            }
        }
        public async Task AddVisions(UserDto request, UserPbiRls userRls)
        {
            try
            {

                await this._userPbiContext.Visions.ForEachAsync(x =>
                {
                    if (request.Visions.Contains(x.Name))
                        this._userPbiContext.UserVisions.Add(
                        new UserVisions()
                        {
                            UserId = userRls.Id,
                            VisionId = x.Id
                        }
                        );
                });
                await this._userPbiContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new VisionNotSaved("Erro ao salvar visões");
            }

        }

        public async Task RemoveRange(List<UserVisions> request)
        {
            try
            {

            this._userPbiContext.UserVisions.RemoveRange(request);
            await this._userPbiContext.SaveChangesAsync();
            } catch (Exception)
            {
                throw new VisionDeleteError("Erro ao deletar visão");
            }
        }
    }
}
