using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Models.Menu;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EbeddedApi.Services
{
    public class AdminService
    {
         private readonly ILogger<AdminService> _logger;
        private readonly UserPbiRlsContext userPbiContext;
        private readonly IdentityContext identityContext;

        public AdminService(ILogger<AdminService> logger,
                               UserPbiRlsContext userPbiContext,
                               IdentityContext identityContext)
        {
            _logger = logger;
            this.userPbiContext = userPbiContext;
            this.identityContext = identityContext;
        }

        public async Task<IEnumerable> GetUsers(){
            
             var result = from user in await this.userPbiContext.UserPbiRls.AsNoTracking()
                                            .Include(x => x.UserVisions)
                                            .ThenInclude(us => us.Vision)
                                            .Include(x => x.UserMenus)
                                            .ThenInclude(mn => mn.Menu)
                                            .ToListAsync()
                         join vis in this.identityContext.Roles.ToList()
                         on user.Perfil equals vis.Id.ToString() 
                         select new {
                             user.Id,
                             user.Nome,
                             user.Email,
                             user.Empresa,
                             user.Identificacao,
                             Perfil = vis.Name,
                             Visions = user.UserVisions,
                             Menus = user.UserMenus,
                             UltimoAcesso = user.DataUltimoAcesso
                         };
            
            return result;
        }

        public async Task AddUserPreRegisterAsync(PreRegisterUserRequest request){
             

                // userVisions para o usuário

                var userRls = new UserPbiRls()
                {
                    Email = request.Email,
                    Identificacao = request.Identificacao,
                    Empresa = string.Empty,
                    Perfil = request.Role,
                    Nome = request.Nome,
                };

                // Adicionando Visões
                var Visions = await userPbiContext.Visions.Where(x => request.Visions.Contains(x.Name)).ToListAsync();
                var userVisions = new List<UserVisions>();
                Visions.ForEach(
                    x =>{
                        userVisions.Add(new UserVisions(){
                            UserId = userRls.Id,
                            Vision = x,
                            VisionId = x.Id
                        });
                    }
                );
                userRls.UserVisions = userVisions;

                var menuUsuario = request.Menus.Select(x => Guid.Parse(x)).ToList();

                // Adicionando Menus
                var Menus = await userPbiContext.MenuItems.Where(x => menuUsuario.Contains(x.Id)).ToListAsync();
                var userMenus = new List<UserMenu>();
                Menus.ForEach(
                    x =>{
                        userMenus.Add(new UserMenu(){
                            UserPbiRelsId = userRls.Id,
                            MenuItemId = x.Id
                        });
                    }
                );
                userRls.UserMenus = userMenus;

                userPbiContext.Add(userRls);
                userPbiContext.SaveChanges();
        }

        public async Task UpdateUser(UpdateUserRequest request){

               var userRls = await this.userPbiContext.UserPbiRls
                                                .Include(x => x.UserVisions)
                                                .ThenInclude(us => us.Vision)
                                                .Include(x => x.UserMenus)
                                                .ThenInclude(us => us.Menu)
                                                .FirstOrDefaultAsync(user => user.Id == request.Id);
                
                userRls.Identificacao = request.Identificacao == "" ? userRls.Identificacao : request.Identificacao;
                userRls.Nome = request.Nome == "" ? userRls.Nome : request.Nome;
                userRls.Perfil = request.Perfil == "" ? userRls.Nome : request.Perfil;

                userRls.UserVisions.Clear();
                userRls.UserMenus.Clear();

                // Inclui visões do usuário
                await userPbiContext.Visions.ForEachAsync(x => {
                                                            if (request.Visions.Contains(x.Name))
                                                            userPbiContext.UserVisions.Add(
                                                            new UserVisions(){
                                                                UserId = userRls.Id,
                                                                VisionId = x.Id
                                                            } 
                                                            );});


                // Inclui Menus do usuário
                 await userPbiContext.MenuItems.ForEachAsync(x => {
                                                            if (request.Menus.Contains(x.Title))
                                                            userPbiContext.UserMenus.Add(
                                                            new UserMenu(){
                                                                UserPbiRelsId = userRls.Id,
                                                                MenuItemId = x.Id
                                                            } 
                                                            );});
                                                            
            userPbiContext.SaveChanges();
        }

        public async Task DeleteUser(string userId, ClaimsPrincipal userRequest){
            
            var transaction = this.userPbiContext.Database.BeginTransaction();

            var userGUID = Guid.Parse(userId);

            try {
                // Verifica se o usuário é o mesmo da solicitação

                var userEmail = await this.userPbiContext.UserPbiRls.AsNoTracking().FirstOrDefaultAsync(x => x.Id ==  userGUID);
                
                var name = userRequest.Claims.ToArray()[0].Value;

                if(userEmail.Email.ToUpper() == name.ToUpper())
                   throw new NotImplementedException();

                // Elimina Visoes do usuário
                var UserVisions = this.userPbiContext.UserVisions
                                        .Where(x => x.UserId == Guid.Parse(userId))
                                        .AsNoTracking()
                                        .ToList();

                 if(UserVisions.Any())
                    this.userPbiContext.UserVisions.RemoveRange(UserVisions);

                
                // Elimina menus
                var userMenus = this.userPbiContext.UserMenus
                                        .Where(x => x.UserPbiRelsId == Guid.Parse(userId))
                                        .AsNoTracking()
                                        .ToList();

                 if(userMenus.Any())
                    this.userPbiContext.UserMenus.RemoveRange(userMenus);

                // Elimina Usuário
                UserPbiRls user = new UserPbiRls(){ Id = userGUID };
                this.userPbiContext.UserPbiRls.Remove(user);

                // Comita transação
                await this.userPbiContext.SaveChangesAsync();
                transaction.Commit();
            } catch(Exception){
                // Rollback na transação
                await transaction.RollbackAsync();
                throw new NotImplementedException("Erro ao remover usuário");
            }
            

        }

        


    }



}