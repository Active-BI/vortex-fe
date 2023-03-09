using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Services;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Models.Dtos;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "ADMIN")]
    public class AdminController : Controller
    {
        private readonly AdminService adminService;

        public AdminController(ILogger<AdminController> logger,
                               AdminService adminService
            )
        {
            this.adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {

            try
            {
                var result = await this.adminService.GetUsers();
                return Ok(result);
            }
            catch (UserGetError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }


        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(Guid userId)
        {
            try
            {

                var result = await this.adminService.GetById(userId);

                return result != null ? Ok(result) : StatusCode(StatusCodes.Status422UnprocessableEntity, null);
            }
            catch (UserGetError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }

        }

        [HttpPut("user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request)
        {

            try
            {
                var updateUser = new UserDto()
                {
                    Email = request.Email,
                    Id = request.Id,
                    Nome = request.Nome,
                    Identificacao = request.Identificacao,
                    EmailContato = request.EmailContato,
                    PerfilId = request.PerfilId,
                    Visions = request.Visions,
                };
                await this.adminService.UpdateUser(updateUser);
            }
            catch (VisionNotSaved e)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, e.Message);
            }

            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }

            return Ok();

        }

        [HttpPost]
        public async Task<IActionResult> preRegister([FromBody] PreRegisterUserRequest request)
        {

            try
            {
                var requestTest = request;
                if (await this.adminService.GetByEmail(request.Email))
                    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Usuário já existente");

                var updateUser = new UserDto()
                {
                    Email = request.Email,
                    Id = Guid.NewGuid(),
                    Nome = request.Nome,
                    Identificacao = request.Identificacao,
                    EmailContato = request.EmailContato,
                    PerfilId = request.PerfilId,
                    Visions = request.Visions,
                };

                var userPbrls = await this.adminService.AddUserPreRegisterAsync(updateUser);
                return Ok(userPbrls);

            }
            catch (VisionNotSaved e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser([FromQuery] string userId)
        {

            try
            {

                await this.adminService.DeleteUser(userId, User);
                return StatusCode(StatusCodes.Status202Accepted);

            }
            catch (VisionGetError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }


        }

    }
}