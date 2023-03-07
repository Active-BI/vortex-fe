
using System;

namespace EbeddedApi.Services.Exceptions
{
    public class Unauthorized : Exception
    {
       public Unauthorized(string message) : base(message)
       {
        
       } 
    }
}