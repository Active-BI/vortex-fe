using System;
using System.Collections.Generic;

namespace EbeddedApi.Models.Cliente
{
    public class VisoesCliente
    {
        public VisoesCliente()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id {get;set;}

        public Guid ClienteId {get;set;}
        public Guid VisaoId {get;set;}

        public Vision Vision {get; set;}
        public Cliente Cliente {get;set;}
    }
}