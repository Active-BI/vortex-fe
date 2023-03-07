using Microsoft.AspNetCore.Mvc;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    // [Authorize(Policy = "")]
    public class ValuesController : Controller
    {
        [HttpGet("")]
        public async Task<IActionResult> GetVisions(){
                return Ok("Funcionou");
        }
    }
}