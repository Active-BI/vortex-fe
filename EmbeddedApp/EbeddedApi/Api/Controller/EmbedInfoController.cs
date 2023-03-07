    using EmbeddedApi.Models;
    using EmbeddedApi.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Text.Json;
    using Microsoft.AspNetCore.Authorization;
    using EbeddedApi.Services;
    using Microsoft.Net.Http.Headers;

namespace EmbeddedApi.Controllers
{

    [Route("api/[controller]")]
     [ApiController]
     [Authorize]
    public class EmbedInfoController : ControllerBase
    {
        private readonly PbiEmbedService pbiEmbedService;

        private readonly JwtService _jwtService;

        public EmbedInfoController(PbiEmbedService pbiEmbedService,  JwtService jwtService)
        {
            this.pbiEmbedService = pbiEmbedService;
            _jwtService = jwtService;
        }

        /// <summary>
        /// Returns Embed token, Embed URL, and Embed token expiry to the client
        /// </summary>
        /// <returns>JSON containing parameters for embedding</returns>
        [HttpGet("report")]
        public async Task<IActionResult> GetEmbedReport([FromQuery] string reportId, string groupId)
        {
            string token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            try
            {
                PowerBI pbiConfig = new PowerBI(){
                    WorkspaceId = groupId,
                    ReportId = reportId
                };

                var email = _jwtService.GetClaimFromToken(token, "email");

                EmbedParams embedParams = await pbiEmbedService.GetEmbedParams(new Guid(groupId), new Guid(reportId), email);
                return Ok(JsonSerializer.Serialize<EmbedParams>(embedParams));
            }
            catch (Exception ex)
            {
                // HttpContext.Response.StatusCode = 500;
                return StatusCode(StatusCodes.Status500InternalServerError,  ex.Message + "\n\n" + ex.StackTrace);
            }
        }

    }
}
