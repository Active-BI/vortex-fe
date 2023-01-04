using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Cliente
{
    public class Cliente
    {
        public Cliente()
        {
            ClienteId = Guid.NewGuid();
        }

        public Guid ClienteId {get;set;} 
        public string Name {get;set;}
    }
}