using System;

namespace EbeddedApi.Services.Exceptions
{
    public class UserNotRegisterException: Exception
    {
       public UserNotRegisterException(string message) : base(message)
       {
        
       } 
    }
}