using System;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto.ClienteDTOs;
using EbeddedApi.Models.Cliente;
using EbeddedApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "Admin")]
    public class ClientesController : Controller
    {
        private readonly UserPbiRlsContext userPbiContext;
        private readonly ClienteService clienteService;
        public ClientesController(UserPbiRlsContext userPbiContext, ClienteService clienteService)
        {
            this.userPbiContext = userPbiContext;
            this.clienteService = clienteService;
        }
        

        [HttpGet]
        public async Task<IActionResult> Get() {
            try {
                var result = this.clienteService.GetCliente();
                return Ok(result.Result);
            } catch(Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter Clientes");
            }
        }

        [HttpGet("{ClientId}")]
        public async Task<IActionResult> GetById(Guid ClientId) {
           try {
                var result = await this.clienteService.GetClienteById(ClientId);
                return  result != null ? Ok(result) :  StatusCode(StatusCodes.Status422UnprocessableEntity,null);
            } catch(Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter Cliente");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ClienteRequestDTO cliente) {
            try {
                await this.clienteService.PostCliente(cliente);
                return StatusCode(StatusCodes.Status201Created);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

        [HttpPut("{ClientId}")]
        public async Task<IActionResult> Post([FromBody] ClienteRequestDTO cliente, Guid ClientId) {
            var getCliente = await this.clienteService.GetClienteById(ClientId);
            if (getCliente == null) return NotFound("Cliente não existe");
            try {
                var result = this.clienteService.PutCliente(cliente, ClientId);
                return Ok(result);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

        [HttpDelete("{ClientId}")]
        public async Task<IActionResult> Delete(Guid ClientId) {
            var getCliente = await this.clienteService.GetClienteById(ClientId);
            if (getCliente == null) return NotFound("Cliente não existe");
            try {
                await this.clienteService.DeleteCliente(ClientId);
                return StatusCode(StatusCodes.Status204NoContent);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
    }
}