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
        private readonly VisionContext visionContext;
        public VisoesClienteService(
            VisionContext visionContext)
        {
            this.visionContext = visionContext;
        }

        public async Task<IEnumerable> GetVisoesCliente() {
            var result = this.visionContext.VisoesCliente
                            .AsNoTracking()
                            .ToList();
            return result;
        }
        public async Task<VisoesCliente> GetVisoesClienteById(Guid visaoClienteId) {
            var result = this.visionContext.VisoesCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.Id == visaoClienteId);
            return result;
        }
        public async Task<VisoesCliente> FindVisao(VisaoClienteRequestDto visao) {
            var result = this.visionContext.VisoesCliente
                            .AsNoTracking()
                            .FirstOrDefault(x => x.ClienteId == visao.ClienteId && x.VisaoId == visao.VisaoId);
            return result;
        }
        public async Task PostVisoesCliente(VisaoClienteRequestDto visao) {
            var newVision = new VisoesCliente(){
                ClienteId = visao.ClienteId,
                VisaoId = visao.VisaoId
            };

            await this.visionContext.VisoesCliente.AddAsync(newVision);
            this.visionContext.SaveChanges();
        }

        public async Task DeleteVisoesCliente(Guid visoesClienteId) {
            var newVisoesCliente = new VisoesCliente(){
                Id = visoesClienteId
            };
            var result = this.visionContext.VisoesCliente
                            .Remove(newVisoesCliente);
            this.visionContext.SaveChanges();
        }
    }
};