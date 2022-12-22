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
        private readonly MenuItemContext menuItemContext;
        public MenuService(
            MenuItemContext menuItemContext,
            IdentityContext identityContext)
        {
            this.menuItemContext = menuItemContext;
        }

        public async Task<IEnumerable> GetMenusCliente() {
            var result = this.menuItemContext.MenusCliente
                            .AsNoTracking()
                            .ToList();
            return result;
        }
        public async Task<MenusCliente> GetMenusClienteById(Guid menuClienteId) {
            var result = this.menuItemContext.MenusCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.Id == menuClienteId);
            return result;
        }
        public async Task<MenusCliente> FindMenu(MenuClienteRequestDto menu) {
            var result = this.menuItemContext.MenusCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.ClienteId == menu.ClienteId && x.MenuId == menu.MenuId);
            return result;
        }
        public async Task PostMenusCliente(MenuClienteRequestDto menu) {
            var newMenu = new MenusCliente(){
                ClienteId = menu.ClienteId,
                MenuId = menu.MenuId
            };

            await this.menuItemContext.MenusCliente.AddAsync(newMenu);
            this.menuItemContext.SaveChanges();
        }

        public async Task DeleteMenusCliente(Guid menusClienteId) {
            var newMenuCliente = new MenusCliente(){
                Id = menusClienteId
            };
            var result = this.menuItemContext.MenusCliente
                            .Remove(newMenuCliente);
            this.menuItemContext.SaveChanges();
        }
    }
}