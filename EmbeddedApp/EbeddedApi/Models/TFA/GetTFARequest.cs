using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.TFA
{
    public class GetTFARequest
    {
        public string IdToken { get; set; }
        public string Token { get; set; }
        public int  TipoIDP { get; set; }
    }
}