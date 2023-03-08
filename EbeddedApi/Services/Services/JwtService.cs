using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EbeddedApi.Context;
using EbeddedApi.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EbeddedApi.Services
{
    public class JwtService
    {
        private readonly string _secret;
        private readonly string _expDate;
        private readonly string _secretTempToken;
        private readonly string _expDateTempToken;
        private readonly UserPbiRlsContext _userPbiContext;
        private readonly IdentityContext _identityContext;

        public JwtService(IConfiguration config, UserPbiRlsContext userPbiContext, IdentityContext identityContext)
        {
            _secret = config.GetSection("JWT").GetSection("secretKey").Value;
            _expDate = config.GetSection("JWT").GetSection("expirationInMinutes").Value;
            _secretTempToken = config.GetSection("JWT").GetSection("secretKeyTemp").Value;
            _expDateTempToken = config.GetSection("JWT").GetSection("expirationInMinutesTemp").Value;
            _userPbiContext = userPbiContext;
            _identityContext = identityContext;

        }

        public string GenerateSecurityToken(string email, MetodoAutenticacao metodo)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secret);

            var user = _userPbiContext.UserPbiRls.AsNoTracking()
                                            .FirstOrDefault(x => x.Email.ToUpper() == email.ToUpper());

            var role = _userPbiContext.Perfil.AsNoTracking().FirstOrDefault(x => x.Id == user.PerfilId);

            var claims = new List<Claim>(){
                new Claim(ClaimTypes.Email, email),
                new Claim("type", "ApiToken"),
                new Claim("firstName", ""),
                new Claim(ClaimTypes.Role, role.Name.ToUpper())
            };

            if (metodo == MetodoAutenticacao.ADFS) claims.Add(new Claim("auth_method", "ADFS"));
            if (metodo == MetodoAutenticacao.Auth) claims.Add(new Claim("auth_method", "Auth"));

            var tokenDescriptor = new SecurityTokenDescriptor

            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDate)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }

        public string GenerateTempToken(string email, MetodoAutenticacao metodo)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretTempToken);
            var claims = new List<Claim>(){
                new Claim(ClaimTypes.Email, email),
                new Claim("auth_method", metodo.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_expDateTempToken)),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public bool ValidateTempToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretTempToken);

            var validationParameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                ClockSkew = TimeSpan.Zero
            };

            handler.ValidateToken(token, validationParameters, out var securityToken);

            if (!(securityToken is JwtSecurityToken jwtSecurityToken) ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
            {
                return false;
            }

            return true;

        }

        public string GetClaimFromToken(string token, string claimType)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
            var stringClaimValue = securityToken.Claims.First(claim => claim.Type == claimType).Value;

            return stringClaimValue;
        }
    }
}