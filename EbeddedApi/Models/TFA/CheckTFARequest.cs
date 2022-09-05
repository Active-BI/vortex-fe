using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.TFA
{
    public class CheckTFARequest
    {
        public string TempToken { get; set; }
        public string IdToken { get; set; }
        public string Pin { get; set; }
    }
}