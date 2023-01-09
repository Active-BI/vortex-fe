
using System;

namespace EbeddedApi.Services.Exceptions
{
    public class LoginError : Exception
    {
       public LoginError(string message) : base(message)
       {
        
       } 
    }
}