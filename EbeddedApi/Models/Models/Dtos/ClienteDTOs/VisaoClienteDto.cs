using System;

namespace EbeddedApi.Controllers.Dto.ClienteDTOs
{
    public class VisaoClienteRequestDto
    {
        public Guid ClienteId {get;set;}
        public Guid VisaoId {get;set;}
    }
}