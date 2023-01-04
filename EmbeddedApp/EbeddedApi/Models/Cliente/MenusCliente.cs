using System;
using System.Collections.Generic;
using EbeddedApi.Models.Menu;

namespace EbeddedApi.Models.Cliente
{
    public class MenusCliente
    {
        public MenusCliente()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id {get;set;}
        public Guid ClienteId {get;set;}
        public Guid MenuId {get;set;}
        public MenuItem MenuItem {get; set;}
        public Cliente Cliente {get;set;}
    }
}