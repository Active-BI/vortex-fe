using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models
{
   public class TwoFactorResult
    {
        public string QrCodeImageUrl { get; set; }
        public string ManualEntryCode { get; set; }
    }
}