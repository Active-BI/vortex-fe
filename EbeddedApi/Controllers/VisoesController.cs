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
    [Authorize(Policy = "")]
    public class VisoesController : Controller
    {
        private readonly VisionService visionService;
        private readonly UserPbiRlsContext userPbiRlsContext;

        public VisoesController(VisionService visionService)
        {
            this.visionService = visionService;
        }
        


       
        [HttpGet("visions")]
        public async Task<IActionResult> GetVisions(){

            try{

                // userVisions para o usuário
                var usrVisions = await userPbiRlsContext.Visions.AsNoTracking().OrderBy(x => x.Name).ToListAsync();
                return Ok(usrVisions);

            } catch(Exception)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Erro ao obter visões.");
            }
            
        }
         [HttpGet("visions/{id}")]
        public async Task<IActionResult> GetVisionsById(Guid id){
           try {

                var result = await this.visionService.GetVisionsById(id);
               
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
                var result = this.visionService.PutVisions(vision, Id);
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

        [HttpPost("visions")]
        public async Task<IActionResult> AddVisions([FromBody] VisionReq vision){
            try {
                var newVision = await this.visionService.AddVisions(vision);
                return StatusCode(StatusCodes.Status201Created, newVision);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }

        }
        [HttpDelete("visions/{Id}")]
        public async Task<IActionResult> DelVisions(Guid Id){
            var getVision = await this.visionService.GetVisionsById(Id);
            if (getVision == null) return NotFound("Menu de Acesso não existe");
            try {
                var result = this.visionService.DelVisions(Id);
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter os dados");
            }
        }

    }
}