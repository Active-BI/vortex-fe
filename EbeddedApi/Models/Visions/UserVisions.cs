using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models
{
    public class UserVisions
    {

        public UserVisions()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id {get; set;}
        public Guid UserId { get; set; }
        public Guid VisionId { get; set; }
        public virtual Vision Vision { get; set; }
        
    }
}