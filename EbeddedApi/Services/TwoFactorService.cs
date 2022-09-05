using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Auth;
using EbeddedApi.Models.TFA;
using EbeddedApi.Services.Exceptions;
using Google.Authenticator;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace EbeddedApi.Services
{
    public class TwoFactorService
    {
        private IConfiguration _configuration { get; }
        private IdentityContext _identityContext { get; }
        private UserTFAContext _userTFAContext { get; }
        private UserPbiRlsContext _userPbiRlsContext { get; }

        private TwoFactorAuthenticator _tfa = new TwoFactorAuthenticator();

        string _issuer { get; }

        public TwoFactorService(IConfiguration configuration,
                                IdentityContext identityContext,
                                UserTFAContext userTFAContext,
                                UserPbiRlsContext userPbiRlsContext)
        {
            _configuration = configuration;
            _identityContext = identityContext;
            _userTFAContext = userTFAContext;
            _userPbiRlsContext = userPbiRlsContext;
            _issuer = _configuration.GetSection("TFAConfigurations").GetSection("Issuer").Value;
        }

        public async Task<UserTFA> GetClientSetup(string email)
        {
            // verifica se o e-mail é cadastrado
            var userRls = await this._userPbiRlsContext.UserPbiRls.FirstOrDefaultAsync(x => x.Email.ToUpper() == email.ToUpper());

            if(userRls == null) throw new UserNotRegisterException("Usuário não cadastrado");

            userRls.DataUltimoAcesso = DateTime.Now.ToUniversalTime();

            await this._userPbiRlsContext.SaveChangesAsync();
            
            UserTFA userTFA = this._userTFAContext.UserTFA.FirstOrDefault(x => x.Email == email);

            //Cria novo usuário na tabela de controle de autenticação
            if (userTFA == null){
                userTFA = new UserTFA(){
                    Email = email,
                    TFASettedUp = false,
                    TFASecretKey = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10)
                };

                await this._userTFAContext.AddAsync(userTFA);
                await this._userTFAContext.SaveChangesAsync();
            }

            //Atualiza chave de accesso usuário já existente e não configurado
            if (userTFA != null && !userTFA.TFASettedUp.Value){
                
                    userTFA.TFASecretKey = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10);
                    this._userTFAContext.Update(userTFA);
                    await this._userTFAContext.SaveChangesAsync();

                } 

                // await this._userTFAContext.AddAsync(userTFA);
                // await this._userTFAContext.SaveChangesAsync();
            return userTFA;

        }

        public TwoFactorResult GenerateTotpUrl(string userTFASecretKey, string userEmail)
        {
            try
            {
                SetupCode setupInfo = _tfa.GenerateSetupCode(_issuer, userEmail, userTFASecretKey, false);

                return new TwoFactorResult()
                {
                    QrCodeImageUrl = setupInfo.QrCodeSetupImageUrl,
                    ManualEntryCode = setupInfo.ManualEntryKey.ToLower(), 
                };
            }
            catch (Exception)
            {
                throw new NotImplementedException();
            }

        }

        public bool CheckPinClientSetup(string email, string pin)
        {
            
            UserTFA userTFA = this._userTFAContext.UserTFA.FirstOrDefault(x => x.Email == email);
            return Verify(userTFA.TFASecretKey, pin);
        }

        private bool Verify(string secretKey, string code)
        {
            return _tfa.ValidateTwoFactorPIN(secretKey, code);
        }

         public string getCode()
        {
           return _tfa.GetCurrentPIN("4e4bc7e421"); // _tfa.ValidateTwoFactorPIN(secretKey, code);
        }

        public async Task SetClientSetup(string email){

            var userRls = this._userPbiRlsContext.UserPbiRls.Any(x => x.Email.ToUpper() == email.ToUpper());

            if(!userRls) throw new NotImplementedException("Usuário não cadastrado");
            
            UserTFA userTFA = this._userTFAContext.UserTFA.FirstOrDefault(x => x.Email == email);

            userTFA.TFASettedUp = true;

            this._userTFAContext.Update(userTFA);
            await this._userTFAContext.SaveChangesAsync();

        }
         public async Task ResetClientSetupAsync(string email){

            UserTFA userTFA = await this._userTFAContext.UserTFA.FirstOrDefaultAsync(x => x.Email == email);

            if(userTFA == null) throw new NotImplementedException("Usuário não cadastrado");

            userTFA.TFASettedUp = false;
            userTFA.TFASecretKey = string.Empty;

            this._userTFAContext.Update(userTFA);
            await this._userTFAContext.SaveChangesAsync();

        }
    }
}