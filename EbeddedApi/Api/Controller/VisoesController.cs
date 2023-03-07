using EbeddedApi.Controllers.Dto;
using EbeddedApi.Models;
using EbeddedApi.Services;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    // [Authorize(Policy = "")]
    public class VisoesController : Controller
    {
        private readonly VisionService visionService;

        public VisoesController(VisionService visionService)
        {
            this.visionService = visionService;
        }
        


       
        [HttpGet("")]
        public async Task<IActionResult> GetVisions(){

            try{

                // userVisions para o usuário
                var usrVisions = this.visionService.GetVisions();
                return Ok(usrVisions.Result);
            }
            catch (VisionGetError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest,e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Erro ao obter visões.");
            }
            
        }
         [HttpGet("{id}")]
        public async Task<IActionResult> GetVisionsById(Guid id){
           try {

                var result = await this.visionService.GetVisionsById(id);
               
                return Ok(result);

            }
            catch (VisionGetError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch (Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao obter Visão");
            }

        }
    }
}