
using System;

namespace EbeddedApi.Services.Exceptions
{
    public class Conflict : Exception
    {
       public Conflict(string message) : base(message)
       {
        
       } 
    }
}