using System.Collections;
using System.Security.Claims;
using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using Microsoft.EntityFrameworkCore;
using Microsoft.PowerBI.Api;
using Models.Models.Dtos;
using Repository.Concretes;
using Repository.Interfaces;

namespace EbeddedApi.Services
{
    public class AdminService
    {
        private readonly IRolesRepository _rolesRepository;
        private readonly IUserPbiRlsRepository _userPbiRlsRepository;
        private readonly IDatabaseFuncions _dataBaseFunctions;
        private readonly IVisionRepository _visionRepository;

        public AdminService(
                               IUserPbiRlsRepository UserPbiRlsRepository,
                               IDatabaseFuncions dataBaseFunctions,
                               IVisionRepository visionRepository,
                               IRolesRepository rolesRepository
            )
        {
            this._userPbiRlsRepository = UserPbiRlsRepository;
            this._dataBaseFunctions = dataBaseFunctions;
            this._rolesRepository = rolesRepository;
            this._visionRepository = visionRepository;
        }

        public async Task<IEnumerable> GetUsers()
        {
            var users = await this._userPbiRlsRepository.GetFromAdmin();

            return users.ToList().OrderBy(x => x.Nome);
        }

        public async Task<UserPbiRls> GetById(Guid id)
        {
            var result = await this._userPbiRlsRepository.GetById(id);

            return result;
        }
        public async Task<bool> GetByEmail(string email)
        {
            if (email == null) return false;

            var users = await this._userPbiRlsRepository.GetFromAdmin();
            var result = users.Any(x => x.Email.ToLower() == email.ToLower());
            return result;
        }

        public async Task<UserPbiRls> AddUserPreRegisterAsync(UserDto request)
        {


            // userVisions para o usuário

            var userRls = new UserPbiRls()
            {
                Email = request.Email,
                Identificacao = request.Identificacao,
                Empresa = string.Empty,
                EmailContato = request.EmailContato,
                PerfilId = request.PerfilId,
                Nome = request.Nome,
            };

            await this._userPbiRlsRepository.AddAsync(userRls);
            await this._visionRepository.AddVisions(request, userRls);

            return userRls;
        }

        public async Task UpdateUser(UserDto request)
        {
            var users = await this._userPbiRlsRepository.GetFromAdmin();

            var userRls = users.FirstOrDefault(user => user.Id == request.Id);

            userRls.Identificacao = request.Identificacao == "" ? userRls.Identificacao : request.Identificacao;
            userRls.Nome = request.Nome == "" ? userRls.Nome : request.Nome;
            userRls.PerfilId = request.PerfilId.ToString() == "" ? userRls.PerfilId : request.PerfilId;
            userRls.EmailContato = request.EmailContato == "" ? userRls.EmailContato : request.EmailContato;

            await this._userPbiRlsRepository.Put(userRls);
            userRls.UserVisions.Clear();


            await this._visionRepository.AddVisions(request, userRls);


            this._dataBaseFunctions.SaveChanges();
        }

        public async Task DeleteUser(string userId, ClaimsPrincipal userRequest)
        {

            var transaction = this._dataBaseFunctions.BeginTransaction();

            var userGUID = Guid.Parse(userId);

            try
            {
                // Verifica se o usuário é o mesmo da solicitação

                var userEmail = await this._userPbiRlsRepository.GetById(userGUID);

                var name = userRequest.Claims.ToArray()[0].Value;

                if (userEmail.Email.ToUpper() == name.ToUpper())
                    throw new NotImplementedException();

                // Elimina Visoes do usuário
                var UserVisions = _visionRepository.GetById(Guid.Parse(userId));


                if (UserVisions.Any())
                    await this._visionRepository.RemoveRange(UserVisions);


                // Elimina Usuário
                UserPbiRls user = new UserPbiRls() { Id = userGUID };
                await this._userPbiRlsRepository.Delete(user);

                // Comita transação
                transaction.Commit();
            }
            catch (Exception ex)
            {
                // Rollback na transação
                await transaction.RollbackAsync();
                throw new NotImplementedException("Erro ao remover usuário");
            }


        }
    }
}