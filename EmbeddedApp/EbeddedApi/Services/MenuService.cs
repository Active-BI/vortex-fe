using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto.ClienteDTOs;
using EbeddedApi.Models.Cliente;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Services
{
    public class MenuService
    {
        private readonly IdentityContext identityContext;
        private readonly UserPbiRlsContext userPbiRlsContext;
        public MenuService(
            UserPbiRlsContext userPbiRlsContext,
            IdentityContext identityContext)
        {
            this.userPbiRlsContext = userPbiRlsContext;
        }

        public async Task<IEnumerable> GetMenusCliente() {
            var result = this.userPbiRlsContext.MenusCliente
                            .AsNoTracking()
                            .ToList();
            return result;
        }
        public async Task<MenusCliente> GetMenusClienteById(Guid menuClienteId) {
            var result = this.userPbiRlsContext.MenusCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.Id == menuClienteId);
            return result;
        }
        public async Task<MenusCliente> FindMenu(MenuClienteRequestDto menu) {
            var result = this.userPbiRlsContext.MenusCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.ClienteId == menu.ClienteId && x.MenuId == menu.MenuId);
            return result;
        }
        public async Task PostMenusCliente(MenuClienteRequestDto menu) {
            var newMenu = new MenusCliente(){
                ClienteId = menu.ClienteId,
                MenuId = menu.MenuId
            };

            await this.userPbiRlsContext.MenusCliente.AddAsync(newMenu);
            this.userPbiRlsContext.SaveChanges();
        }

        public async Task DeleteMenusCliente(Guid menusClienteId) {
            var newMenuCliente = new MenusCliente(){
                Id = menusClienteId
            };
            var result = this.userPbiRlsContext.MenusCliente
                            .Remove(newMenuCliente);
            this.userPbiRlsContext.SaveChanges();
        }
    }
}