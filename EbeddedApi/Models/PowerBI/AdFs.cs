using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Adfs
{
    public class AdFs
    {
        public AdfsItem Ish { get; set; }
        public AdfsItem Cli { get; set; }
    }

    public class AdfsItem {
        public string Tenant { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public string MetaDataEndPoint { get; set; }
        public string Domain { get; set; }
        public string DomainTrust { get; set; }
    }
}