using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Models.Base;

namespace EbeddedApi.Models
{
    public class UserSignInResponse: BaseResponse
    {
        public string Token { get; set; }
        public bool Redirect2FA { get; set; }
        public string ManualEntryKey { get; set; }
        public string UrlImage { get; set; }
        public string TempToken { get; set; }
    }
}