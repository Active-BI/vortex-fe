using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using EbeddedApi.Models.Enums;
using EbeddedApi.Models.TFA;
using EbeddedApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EbeddedApi.Controllers
{
    [Route("api/[controller]")]
    public class TfaController : Controller
    {
        private readonly ILogger<TfaController> _logger;
        public TwoFactorService TfaService { get; }
        public JwtService JwtService { get; }
        public TokenService TokenService { get; }

        public TfaController(ILogger<TfaController> logger,
                             TwoFactorService tfaService,
                             JwtService jwtService,
                             TokenService tokenService)
        {
            _logger = logger;
            TfaService = tfaService;
            JwtService = jwtService;
            TokenService = tokenService;
        }


        [HttpPost("GetTFA")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTFA([FromBody]GetTFARequest request)
        {
             this._logger.LogInformation("Chave requisitada {s} Acessou o {s} em {DT}", JsonSerializer.Serialize(request) , typeof(TfaController), DateTime.Now);

            try {

                bool isValidToken;
                isValidToken = TokenService.VerifyADFSToken(request.Token, (TipoIDP)request.TipoIDP);
                if (!isValidToken) return StatusCode(StatusCodes.Status401Unauthorized,"Token Inválido");

                var email = this.JwtService.GetClaimFromToken(request.IdToken, "upn");

                var tokenHandler = new JwtSecurityTokenHandler();
                // Obtém usuário 
                var decodedToken = tokenHandler.ReadToken(request.Token);
                var tokenS = decodedToken as JwtSecurityToken;

                var userTFA = await this.TfaService.GetClientSetup(email);

                this._logger.LogInformation("{s} Acessou o {s} em {DT}", email, typeof(TfaController), DateTime.Now);

                var setup = TfaService.GenerateTotpUrl(userTFA.TFASecretKey, email);

                return Ok(new { 
                                UserTempToken = this.JwtService.GenerateTempToken(email, MetodoAutenticacao.ADFS),
                                QrCodeImageUrl = !userTFA.TFASettedUp.Value ? setup.QrCodeImageUrl :  String.Empty,
                                ManualEntryCode = !userTFA.TFASettedUp.Value ? setup.ManualEntryCode : String.Empty
                            });

            }
            catch(Exception){
                return StatusCode(StatusCodes.Status401Unauthorized, "Usuário não autorizado");
            }

        }

        [HttpPost]
        [AllowAnonymous]

        public async Task<IActionResult> CheckTFA([FromBody] CheckTFARequest request)
        {
            // Validação de Token temporário
            var isValid = this.JwtService.ValidateTempToken(request.TempToken);
            if (!isValid) return StatusCode(StatusCodes.Status401Unauthorized, "Token Inválido.");

            // Obter usuário do token
            string email = String.Empty;

            var metodo = this.JwtService.GetClaimFromToken(request.TempToken, "auth_method");
            if(metodo == "Auth") email = this.JwtService.GetClaimFromToken(request.TempToken, "email");
            if(metodo == "ADFS") email = this.JwtService.GetClaimFromToken(request.IdToken, "upn");


            // Verifica Pin
            var isPinValid = this.TfaService.CheckPinClientSetup(email, request.Pin);
            if (!isPinValid) return StatusCode(StatusCodes.Status422UnprocessableEntity, "Pin Inválido.");


            // Finaliza configuração para usuário não configurado
            await this.TfaService.SetClientSetup(email);


            // Envia securityToken

            var token = this.JwtService.GenerateSecurityToken(email, Enum.TryParse(metodo, out MetodoAutenticacao auth_method) ? auth_method : MetodoAutenticacao.ADFS);

            return Ok(new {Succeded = true,
                           ApiToken = token
                           });
        }
    }
}