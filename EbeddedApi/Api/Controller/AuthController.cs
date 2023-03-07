using EbeddedApi.Models.Auth;
using EbeddedApi.Services;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        public UserManager<User> UserManager { get; }
        public AuthService AuthService { get; }

        public AuthController(
                              UserManager<User> userManager,
                              AuthService authService
                              )
        {
            UserManager = userManager;
            AuthService = authService;
        }


        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] SignAuthRequest request)
        {
            try
            {                
                var apiToken = await this.AuthService.AuthLogin(request.Email, request.Password);
                return Ok(apiToken);
            }
            catch(LimitAttemptException){
                return StatusCode(StatusCodes.Status423Locked);
            }
            catch(UserNotRegisterException ex){
                return StatusCode(StatusCodes.Status412PreconditionFailed, ex.Message);
            }
            catch(UserGetError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
            }
            catch(LoginError e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, e.Message);
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
            catch (Unauthorized e)
            {
                return StatusCode(StatusCodes.Status401Unauthorized, e.Message);
            }
            catch (Conflict e)
            {
                return StatusCode(StatusCodes.Status409Conflict, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status403Forbidden, e.Message);
            }
         
        }
    }
}