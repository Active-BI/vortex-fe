using System;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Models;
using EbeddedApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "Admin")]
    public class VisoesController : Controller
    {
        private readonly AdminService adminService;
        private readonly UserPbiRlsContext userPbiContext;

        public VisoesController(AdminService adminService)
        {
            this.adminService = adminService;
        }
        


       
        [HttpGet("visions")]
        public async Task<IActionResult> GetVisions(){

            try{

                // userVisions para o usuário
                var usrVisions = await userPbiContext.Visions.AsNoTracking().OrderBy(x => x.Name).ToListAsync();
                return Ok(usrVisions);

            } catch(Exception)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Erro ao obter visões.");
            }
            
        }
         [HttpGet("visions/{id}")]
        public async Task<IActionResult> GetVisionsById(Guid id){
           try {

                var result = await this.adminService.GetVisionsById(id);
               
                return Ok(result);

            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter Visão");
            }

        }
        [HttpPut("visions/{Id}")]
        public async Task<IActionResult> PutVisions([FromBody] Vision vision,Guid Id){
            var getVision = await GetVisionsById(Id);

            if (getVision == null) return NotFound("Visão existe");

           try {
                var result = this.adminService.PutVisions(vision, Id);
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

        [HttpPost("visions")]
        public async Task<IActionResult> AddVisions([FromBody] VisionReq vision){
            try {
                var newVision = await this.adminService.AddVisions(vision);
                return StatusCode(StatusCodes.Status201Created, newVision);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }

        }
        [HttpDelete("visions/{Id}")]
        public async Task<IActionResult> DelVisions(Guid Id){
            var getVision = await this.adminService.GetVisionsById(Id);
            if (getVision == null) return NotFound("Menu de Acesso não existe");
            try {
                var result = this.adminService.DelVisions(Id);
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

    }
}