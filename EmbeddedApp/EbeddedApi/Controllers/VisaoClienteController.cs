using System;
using System.Threading.Tasks;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Controllers.Dto.ClienteDTOs;
using EbeddedApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "")]
    public class VisaoClienteController : Controller
    {
        private readonly VisoesClienteService visoesClienteService;

        public VisaoClienteController(VisoesClienteService visoesClienteService)
        {
            this.visoesClienteService = visoesClienteService;
        }
        


        
        [HttpGet("")]
        public async Task<IActionResult> GetVisoesCliente() {
            try {
                var result = await this.visoesClienteService.GetVisoesCliente();
                return Ok(result);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
        [HttpGet("{visaoClienteId}")]
        public async Task<IActionResult> GetVisoesClienteById(Guid visaoClienteId) {
            try {
                var result = await this.visoesClienteService.GetVisoesClienteById(visaoClienteId);
                return Ok(result);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
        [HttpPost("")]
        public async Task<IActionResult> PostVisaoCliente([FromBody] VisaoClienteRequestDto visao) {
            var findVisao = await this.visoesClienteService.FindVisao(visao);
            if (findVisao != null) return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao salvar dados");
            try {
                await this.visoesClienteService.PostVisoesCliente(visao);
                return StatusCode(StatusCodes.Status201Created);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao salvar dados");
            }
        }
    
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteVisaoCliente(Guid Id) {
            var getVisaoCliente = await this.visoesClienteService.GetVisoesClienteById(Id);
            if (getVisaoCliente == null) return NotFound("visão-cliente não existe");
            try {
                await this.visoesClienteService.DeleteVisoesCliente(Id);
                return StatusCode(StatusCodes.Status204NoContent);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
    }
}