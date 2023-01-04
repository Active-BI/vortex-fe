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
    public class VisoesClienteService
    {
        private readonly UserPbiRlsContext userPbiRlsContext;
        public VisoesClienteService(
            UserPbiRlsContext userPbiRlsContext)
        {
            this.userPbiRlsContext = userPbiRlsContext;
        }

        public async Task<IEnumerable> GetVisoesCliente() {
            var result = this.userPbiRlsContext.VisoesCliente
                            .AsNoTracking()
                            .ToList();
            return result;
        }
        public async Task<VisoesCliente> GetVisoesClienteById(Guid visaoClienteId) {
            var result = this.userPbiRlsContext.VisoesCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.Id == visaoClienteId);
            return result;
        }
        public async Task<VisoesCliente> FindVisao(VisaoClienteRequestDto visao) {
            var result = this.userPbiRlsContext.VisoesCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.ClienteId == visao.ClienteId && x.VisaoId == visao.VisaoId);
            return result;
        }
        public async Task PostVisoesCliente(VisaoClienteRequestDto visao) {
            var newVision = new VisoesCliente(){
                ClienteId = visao.ClienteId,
                VisaoId = visao.VisaoId
            };

            await this.userPbiRlsContext.VisoesCliente.AddAsync(newVision);
            this.userPbiRlsContext.SaveChanges();
        }

        public async Task DeleteVisoesCliente(Guid visoesClienteId) {
            var newVisoesCliente = new VisoesCliente(){
                Id = visoesClienteId
            };
            var result = this.userPbiRlsContext.VisoesCliente
                            .Remove(newVisoesCliente);
            this.userPbiRlsContext.SaveChanges();
        }
    }
};