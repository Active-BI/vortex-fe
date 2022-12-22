using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Models.Auth;
using EbeddedApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "Admin")]
    public class AdminController : Controller
    {
        private readonly ILogger<AdminController> _logger;
        private readonly UserPbiRlsContext userPbiContext;
        private readonly IdentityContext identityContext;
        private readonly AdminService adminService;
        private readonly JwtService jwtService;

        public AdminController(ILogger<AdminController> logger,
                               UserPbiRlsContext userPbiContext,
                               IdentityContext identityContext,
                               AdminService adminService,
                               JwtService jwtService)
        {
            _logger = logger;
            this.userPbiContext = userPbiContext;
            this.identityContext = identityContext;
            this.adminService = adminService;
            this.jwtService = jwtService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(){

            try {
                var result = await this.adminService.GetUsers();
                return Ok(result);
            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao processar essa informação");
            }
                         
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(Guid userId){

            var result = await this.userPbiContext.UserPbiRls.AsNoTracking()
                                            .Include(x => x.UserVisions)
                                            .ThenInclude(us => us.Vision)
                                            .Include(x => x.UserMenus)
                                            .ThenInclude(mn => mn.Menu)
                                            .FirstOrDefaultAsync(user => user.Id == userId);
            
            return result != null ? Ok(result) : StatusCode(StatusCodes.Status422UnprocessableEntity,null);

        }

        [HttpPost("roles")]
        public async Task<IActionResult> AddRoles([FromQuery] string name){

            try{

                // userVisions para o usuário
                
                Role role = new Role(){
                    Name = name,
                    NormalizedName = name.ToUpperInvariant(),
                };

                await identityContext.Roles.AddAsync(role);
                identityContext.SaveChanges();

                return Ok();

            } catch(Exception)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Erro ao adcionar visão.");
            }
            
                               
        }

        [HttpPut("user")]
        public async Task<IActionResult> UpdateUser([FromBody]UpdateUserRequest request){

            try{

                await this.adminService.UpdateUser(request);



            } catch(Exception)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Erro ao atualizar usuário");
            }
            
            return Ok();
            
                         
        }

        [HttpPost]
        public async Task<IActionResult> preRegister([FromBody] PreRegisterUserRequest request){

            try{

                if(userPbiContext.UserPbiRls.AsNoTracking().Any(x => x.Email.ToLower() == request.Email.ToLower()))
                    return StatusCode(StatusCodes.Status422UnprocessableEntity, "Usuário já existente");

                // userVisions para o usuário

                await this.adminService.AddUserPreRegisterAsync(request);
        

            } catch(Exception)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "Erro ao incluir o usuário");
            }
            
            return Ok();
                        
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser([FromQuery] string userId){

           try {

                await this.adminService.DeleteUser(userId, User);
                return StatusCode(StatusCodes.Status202Accepted);

            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao processar essa informação");
            }


        }

        [AllowAnonymous]
        [HttpGet("menucontext")]
        public async Task<IActionResult> GetMenus(){
            
           var email = User.Claims.ToArray()[0].Value;
           try {

                var itens = await this.userPbiContext.UserPbiRls
                                .Include(um => um.UserMenus)
                                .ThenInclude(mi => mi.Menu)
                                .ThenInclude(si => si.MenuSubItens)
                                .FirstOrDefaultAsync(x => x.Email.ToUpper() == email.ToUpper());

                var result = itens.UserMenus.Select(x => new {
                    x.Menu.Path,
                    x.Menu.Title,
                    x.Menu.LongTitle,
                    x.Menu.Icon,
                    x.Menu.Class,
                    x.Menu.Context,
                    x.Menu.MenuSubItens

                });
               
                return Ok(result);

            }
            catch(Exception){
                return StatusCode(StatusCodes.Status400BadRequest, "Houve um erro ao processar essa informação");
            }

        }
    }
}