using System.Security.Claims;
using EbeddedApi.Models.Auth;
using EbeddedApi.Models.Enums;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Identity;
using Repository.Interfaces;

namespace EbeddedApi.Services
{
    public class AuthService
    {
        #region Inicadores

        private JwtService JwtService { get; }
        private UserManager<User> UserManager { get; }
        private IUserPbiRlsRepository _userPbiRlsRepository;
        public IIdentityRepository _identityRepository;

        public AuthService(UserManager<User> userManager,
                           JwtService jwtService,
                           IUserPbiRlsRepository userPbiRlsRepository,
                           IIdentityRepository identityRepository
                          )
        {
            _identityRepository = identityRepository;
            _userPbiRlsRepository = userPbiRlsRepository;
            JwtService = jwtService;
            UserManager = userManager;
        }
        #endregion

        #region Métodos Públicos
    
          public async Task<UserTFAResponse> AuthLogin(string email, string password){
            var users = await this._identityRepository.Get();
            var user = users.FirstOrDefault(x => x.NormalizedEmail == email.ToUpper());
                
                if (await this.UserManager.CheckPasswordAsync(user, password))
                {
                    await UserManager.ResetAccessFailedCountAsync(user);
                    await UserManager.SetLockoutEndDateAsync(user, null);

                    return new UserTFAResponse()
                    {
                        token = this.JwtService.GenerateSecurityToken(email, MetodoAutenticacao.Auth),
                        QrCodeImageUrl = "", //qrCodeImageUrl,
                        ManualEntryCode = "" //manualEntryCode
                    };
                }
                else
                {
                    await UserManager.AccessFailedAsync(user);
                    if(user.AccessFailedCount >= 3) throw new LimitAttemptException();
                }
                throw new LoginError("Não foi possível efetuar o login");
          }


        public async Task AuthRegister(SignAuthRequest request)
         {
            if (!await VerificaUsuarioPreCadastrado(request.Email)) throw new Unauthorized("Usuário não Autorizado");
            var users = await this._identityRepository.Get();

            var containsUser = users.Any(x => x.NormalizedEmail == request.Email.ToUpper());
            
            if (containsUser) throw new Conflict("Email já cadastrado");
            User user = new User()
            {
                UserName = request.Email.Split("@")[0],
                NormalizedUserName = request.Email.Split("@")[0].ToUpper(),
                Email = request.Email,
                NormalizedEmail = request.Email.ToUpper(),
                SecurityStamp = Guid.NewGuid().ToString(),
            };
            await this.UserManager.CreateAsync(user, request.Password);
            await this.UserManager.AddClaimAsync(user, new Claim("auth_method", "Auth"));

            await this._identityRepository.Add(user);
        }


        #endregion

        #region Métodos Provados

        async Task<bool> VerificaUsuarioPreCadastrado(string email){
            var users = await this._userPbiRlsRepository.GetFromAdmin();
           return users.Any(x => x.Email.ToUpper() == email.ToUpper());
        }


        #endregion
    }
}