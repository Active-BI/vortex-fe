using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Services.Exceptions
{
    public class UserNotRegisterException: Exception
    {
       public UserNotRegisterException(string message) : base(message)
       {
        
       } 
    }
}