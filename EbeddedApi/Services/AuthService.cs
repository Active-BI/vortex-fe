using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Auth;
using EbeddedApi.Models.Enums;
using EbeddedApi.Services.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EbeddedApi.Services
{
    public class AuthService
    {
        #region Inicadores

        private JwtService JwtService { get; }
        private UserManager<User> UserManager { get; }
        private SignInManager<User> SignManager { get; }
        public TwoFactorService TwoFactorService { get; set; }
        public IdentityContext IdentityContext { get; }
        public UserPbiRlsContext UserPbiRlsContext { get; }
        private readonly IOptions<RecaptchaConfig> Recaptcha;
        private readonly IHttpClientFactory ClientFactory;

        public AuthService(UserManager<User> userManager,
                           SignInManager<User> signInManager,
                           JwtService jwtService,
                           TwoFactorService twoFactorService,
                           IdentityContext identityContext,
                           UserPbiRlsContext userPbiRlsContext,
                           IOptions<RecaptchaConfig> recaptcha,
                           IHttpClientFactory clientFactory)
        {
            TwoFactorService = twoFactorService;
            IdentityContext = identityContext;
            UserPbiRlsContext = userPbiRlsContext;
            JwtService = jwtService;
            UserManager = userManager;
            SignManager = signInManager;
            Recaptcha = recaptcha;
            ClientFactory = clientFactory;
        }
        #endregion

        #region Métodos Públicos
    
          public async Task<UserTFAResponse> AuthLogin(string email, string password, string tokenCaptcha){

            var user = this.IdentityContext.Users.FirstOrDefault(x => x.NormalizedEmail == email.ToUpper());
                
                // Verifica tentativas login
                if (user.AccessFailedCount >= 3){
                    var result = await verifyRecaptha(tokenCaptcha);
                    if (!result.Success) throw new LimitAttemptException();
                }
                
                if (await this.UserManager.CheckPasswordAsync(user, password))
                {
                    await UserManager.ResetAccessFailedCountAsync(user);
                    await UserManager.SetLockoutEndDateAsync(user, null);

                    // Gera response para 2FA
                    var userTFA = await this.TwoFactorService.GetClientSetup(email);

                    string qrCodeImageUrl = string.Empty;
                    string manualEntryCode = string.Empty;

                    if (!userTFA.TFASettedUp.Value)
                    {
                        var setup = TwoFactorService.GenerateTotpUrl(userTFA.TFASecretKey, email);
                        qrCodeImageUrl = setup.QrCodeImageUrl;
                        manualEntryCode = setup.ManualEntryCode;
                    }

                    return new UserTFAResponse()
                    {
                        UserTempToken = this.JwtService.GenerateTempToken(email, MetodoAutenticacao.Auth),
                        QrCodeImageUrl = qrCodeImageUrl,
                        ManualEntryCode = manualEntryCode
                    };
                }
                else
                {
                    await UserManager.AccessFailedAsync(user);
                    if(user.AccessFailedCount >= 3) throw new LimitAttemptException();
                }
                throw new NotImplementedException("Não foi possível efetuar o login");


          }


        public async Task AuthRegister(SignAuthRequest request)
        {

            // Verifica reCaptcha
            var result = await verifyRecaptha(request.CaptchaResponse);

            if (!result.Success) throw new NotImplementedException("Erro ao validar entrada");


            //Verifica usuário cadastrado
            if (!await VerificaUsuarioCadastrado(request.Email)) throw new NotImplementedException("Usuário não Autorizado");


            var containsUser = await this.IdentityContext.Users.AsNoTracking()
                                                               .AnyAsync(x => x.NormalizedEmail == request.Email.ToUpper());



            if (containsUser) throw new NotImplementedException("Email já cadastrado");

            User user = new User()
            {
                UserName = request.Email.Split("@")[0],
                Email = request.Email,
                SecurityStamp = Guid.NewGuid().ToString(),

            };

            var createUser = await this.UserManager.CreateAsync(user, request.Password);
            await this.UserManager.AddClaimAsync(user, new Claim("auth_method", "Auth"));


        }




        public async Task<RecaptchaResponse> verifyRecaptha(string capResponse)
        {
            var secret = Recaptcha.Value.SecretKey;
            string urlApi = string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}",secret,capResponse);
            var request = new HttpRequestMessage(HttpMethod.Post,urlApi);
            var client = ClientFactory.CreateClient();
            var response = await client.SendAsync(request);

           if (response.IsSuccessStatusCode)
        {
            var strObject = await response.Content.ReadAsStringAsync();
            var respCaptcha = JsonConvert.DeserializeObject<RecaptchaResponse>(strObject);
           return respCaptcha;
        }
        else
        {
            return null;
        }

        }

        #endregion 

        #region Métodos Provados
              
        async Task<bool> VerificaUsuarioCadastrado(string email){

           return await this.UserPbiRlsContext.UserPbiRls.AsNoTracking().AnyAsync(x => x.Email.ToUpper() == email.ToUpper());
        }


        #endregion
    }
}