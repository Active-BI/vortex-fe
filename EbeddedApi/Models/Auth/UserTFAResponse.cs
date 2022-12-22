using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Auth
{
    public class UserTFAResponse
    {
        public string UserTempToken { get; set; }
        public string QrCodeImageUrl { get; set; }
        public string ManualEntryCode { get; set; }
    }
}