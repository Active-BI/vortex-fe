using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using EbeddedApi.Models.Adfs;
using EbeddedApi.Models.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using EbeddedApi.Helpers;

namespace EbeddedApi.Services
{
    public class TokenService
    {
        OpenIdConnectConfiguration openIdConfig;
        private readonly IConfiguration _configuration;
        private readonly IOptions<AdFs> _ADFSConfig;
        TokenValidationParameters validationParameters;

        public TokenService(IOptions<AdFs> ADFSConfig, IConfiguration configuration)
        {
            _configuration = configuration;
            _ADFSConfig = ADFSConfig;

          
        }
       
        public bool VerifyADFSToken(string token, TipoIDP tipo)
        {
            AdfsItem adfsItem = (tipo == TipoIDP.CLI) ? _ADFSConfig.Value.Cli : _ADFSConfig.Value.Ish;


            IConfigurationManager<OpenIdConnectConfiguration> configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>($"{adfsItem.Domain}.well-known/openid-configuration",
                new OpenIdConnectConfigurationRetriever());

            openIdConfig = AsyncHelper.RunSync(async () => await configurationManager.GetConfigurationAsync(CancellationToken.None));


            validationParameters =
            new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidIssuers = new[] { adfsItem.Domain, adfsItem.DomainTrust, adfsItem.Issuer },
                ValidateIssuer = true,
                ValidAudience = adfsItem.Audience,
                IssuerSigningKeys = openIdConfig.SigningKeys,
                ValidateIssuerSigningKey = true
            };
            try
            {
                SecurityToken validatedToken;
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                handler.ValidateToken(token, validationParameters, out validatedToken);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
           
        }

        private string GenerateTokenPortal(string email, IList<string> roles)
        {

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, email)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(this._configuration.GetSection("JWT:Key").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // tempo de expiração do token: 90 dias
            var expiration = DateTime.UtcNow.AddDays(90);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiration,
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var userToken = new JwtSecurityTokenHandler().WriteToken(token);
          
            return userToken;
        }
    
    }
}