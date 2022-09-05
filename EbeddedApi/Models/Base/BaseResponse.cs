using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Base
{
    public class BaseResponse
    {
        public virtual bool Succeded { get; set; }
        public virtual string Message { get; set; }
    }
}