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
    public class ClienteService
    {
        private readonly IdentityContext identityContext;
        private readonly UserPbiRlsContext userPbiContext;
        public ClienteService(
            UserPbiRlsContext userPbiContext,
            IdentityContext identityContext)
        {
            this.userPbiContext = userPbiContext;
        }

        public async Task<IEnumerable> GetCliente() {
            var result = this.userPbiContext.Cliente
                            .AsNoTracking()
                            .OrderBy(x => x.Name)
                            .ToList();
            return result;
        }

        public async Task<Cliente> GetClienteById(Guid ClienteId) {
            var result = await this.userPbiContext.Cliente
                            .AsNoTracking()
                            .FirstOrDefaultAsync(x => x.ClienteId == ClienteId);
            return result;
        }

        public async Task PostCliente(ClienteRequestDTO Cliente) {
            var newCliente = new Cliente(){
                Name = Cliente.Name
            };
            var result = await this.userPbiContext.Cliente
                            .AddAsync(newCliente);
            this.userPbiContext.SaveChanges();
        }
        public async Task<Cliente> PutCliente(ClienteRequestDTO Cliente, Guid ClienteId) {
            var newCliente = new Cliente(){
                ClienteId = ClienteId,
                Name = Cliente.Name
            };
            var result = this.userPbiContext.Cliente
                            .Update(newCliente);
            this.userPbiContext.SaveChanges();
            return newCliente;
        }
        public async Task DeleteCliente(Guid ClienteId) {
            var newCliente = new Cliente(){
                ClienteId = ClienteId
            };
            var result = this.userPbiContext.Cliente
                            .Remove(newCliente);
            this.userPbiContext.SaveChanges();
        }

        public async Task<IEnumerable> GetVisoesCliente() {
            var result = this.userPbiContext.VisoesCliente
                            .AsNoTracking()
                            .ToList();
            return result;
        }
        public async Task<VisoesCliente> GetVisoesClienteById(Guid visaoClienteId) {
            var result = this.userPbiContext.VisoesCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.Id == visaoClienteId);
            return result;
        }
        public async Task<VisoesCliente> FindVisao(VisaoClienteRequestDto visao) {
            var result = this.userPbiContext.VisoesCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.ClienteId == visao.ClienteId && x.VisaoId == visao.VisaoId);
            return result;
        }
        public async Task PostVisoesCliente(VisaoClienteRequestDto visao) {
            var newVision = new VisoesCliente(){
                ClienteId = visao.ClienteId,
                VisaoId = visao.VisaoId
            };

            await this.userPbiContext.VisoesCliente.AddAsync(newVision);
            this.userPbiContext.SaveChanges();
        }

        public async Task DeleteVisoesCliente(Guid visoesClienteId) {
            var newVisoesCliente = new VisoesCliente(){
                Id = visoesClienteId
            };
            var result = this.userPbiContext.VisoesCliente
                            .Remove(newVisoesCliente);
            this.userPbiContext.SaveChanges();
        }

        //////////////////////////////////////////////////////////////////////

        public async Task<IEnumerable> GetMenusCliente() {
            var result = this.userPbiContext.MenusCliente
                            .AsNoTracking()
                            .ToList();
            return result;
        }
        public async Task<MenusCliente> GetMenusClienteById(Guid menuClienteId) {
            var result = this.userPbiContext.MenusCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.Id == menuClienteId);
            return result;
        }
        public async Task<MenusCliente> FindMenu(MenuClienteRequestDto menu) {
            var result = this.userPbiContext.MenusCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.ClienteId == menu.ClienteId && x.MenuId == menu.MenuId);
            return result;
        }
        public async Task PostMenusCliente(MenuClienteRequestDto menu) {
            var newMenu = new MenusCliente(){
                ClienteId = menu.ClienteId,
                MenuId = menu.MenuId
            };

            await this.userPbiContext.MenusCliente.AddAsync(newMenu);
            this.userPbiContext.SaveChanges();
        }

        public async Task DeleteMenusCliente(Guid menusClienteId) {
            var newMenuCliente = new MenusCliente(){
                Id = menusClienteId
            };
            var result = this.userPbiContext.MenusCliente
                            .Remove(newMenuCliente);
            this.userPbiContext.SaveChanges();
        }
    }
}