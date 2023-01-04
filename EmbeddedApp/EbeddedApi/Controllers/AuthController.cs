using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Models.Auth;
using EbeddedApi.Services;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> _logger;
        public TwoFactorService TfaService { get; }
        public UserManager<User> UserManager { get; }
        public AuthService AuthService { get; }
        public IdentityContext IdentityContext { get; }

        public AuthController(ILogger<AuthController> logger, 
                              TwoFactorService tfaService,
                              UserManager<User> userManager,
                              AuthService authService,
                              IdentityContext identityContext
                              )
        {
            _logger = logger;
            TfaService = tfaService;
            UserManager = userManager;
            AuthService = authService;
            IdentityContext = identityContext;
        }


        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] SignAuthRequest request)
        {
            try
            {                
                var apiToken = await this.AuthService.AuthLogin(request.Email, request.Password, request.CaptchaResponse);
                return Ok(apiToken);
            }
            catch(LimitAttemptException){
                return StatusCode(StatusCodes.Status423Locked);
            }
            catch(UserNotRegisterException ex){
                return StatusCode(StatusCodes.Status412PreconditionFailed, ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] SignAuthRequest request)
        {

            try
            {
                await this.AuthService.AuthRegister(request);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status403Forbidden, e.Message);
            }
         

        }

        [HttpGet("resetTFA/{email}")]
        [Authorize]
        public async Task<IActionResult> resetTFA(string email)
        {
            try
            {
                await this.TfaService.ResetClientSetupAsync(email);
                return Ok();

            } catch(Exception)
            {
                return StatusCode(StatusCodes.Status422UnprocessableEntity, "Não foi possível atualizar o usuário");
            }

        }



    
    }
}