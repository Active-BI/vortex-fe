using System;
using System.Threading.Tasks;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "Admin")]
    public class MenuItemsController : Controller
    {
        private readonly AdminService adminService;

        public MenuItemsController(AdminService adminService)
        {
            this.adminService = adminService;
        }
        


        [HttpGet("")]
        public async Task<IActionResult> GetMenuItens(){
            
           try {

                var result = await this.adminService.GetMenuItens();
               
                return Ok(result);

            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenuItensById(Guid id){
           try {

                var result = await this.adminService.GetMenuItensById(id);
               
                return Ok(result);

            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> PutMenuItens([FromBody] MenuItemRequest menuItem,Guid Id){
            var getMenuItem = await GetMenuItensById(Id);

            if (getMenuItem == null) return NotFound("Menu de Acesso não existe");

           try {
                var result = this.adminService.PutMenuItens(menuItem, Id);
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

        [HttpPost("")]
        public async Task<IActionResult> AddMenuItem([FromBody] MenuItemRequest menuItem){
            try {
                var resultMenu = await this.adminService.AddMenuItem(menuItem);
                return StatusCode(StatusCodes.Status201Created, resultMenu);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }

        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DelMenuItens(Guid Id){
            var menuItem = await this.adminService.GetMenuItensById(Id);
            if (menuItem == null) return NotFound("Menu de Acesso não existe");
            try {
                var result = this.adminService.DelMenuItem(Id);
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }
    }
}