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
    [Authorize(Policy = "Admin")]
    public class MenuClienteController : Controller
    {
        private readonly MenuService menuService;

        public MenuClienteController(ClienteService clienteService)
        {
            this.menuService = menuService;
        }
        

        [HttpGet("")]
        public async Task<IActionResult> GetMenusCliente() {
            try {
                var result = await this.menuService.GetMenusCliente();
                return Ok(result);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
        [HttpGet("{menuClienteId}")]
        public async Task<IActionResult> GetMenusClienteById(Guid menuClienteId) {
            try {
                var result = await this.menuService.GetMenusClienteById(menuClienteId);
                return Ok(result);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
        [HttpPost("")]
        public async Task<IActionResult> PostMenusCliente([FromBody] MenuClienteRequestDto menu) {
            var findMenu = await this.menuService.FindMenu(menu);
            if (findMenu != null) return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao salvar dados");
            try {
                await this.menuService.PostMenusCliente(menu);
                return StatusCode(StatusCodes.Status201Created);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao salvar dados");
            }
        }
    
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteMenuCliente(Guid Id) {
            var getMenuCliente = await this.menuService.GetMenusClienteById(Id);
            if (getMenuCliente == null) return NotFound("menu-cliente não existe");
            try {
                await this.menuService.DeleteMenusCliente(Id);
                return StatusCode(StatusCodes.Status204NoContent);
            } catch (Exception) {
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
    }
}