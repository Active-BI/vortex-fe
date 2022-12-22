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

    }
}