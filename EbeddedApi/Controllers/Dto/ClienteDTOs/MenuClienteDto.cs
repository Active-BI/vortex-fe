using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Controllers.Dto.ClienteDTOs
{
    public class MenuClienteRequestDto
    {
        
        public Guid ClienteId {get;set;}
        public Guid MenuId {get;set;}
    }
}