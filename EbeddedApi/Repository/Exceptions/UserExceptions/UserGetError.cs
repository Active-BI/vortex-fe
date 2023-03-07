namespace EbeddedApi.Services.Exceptions
{
    public class UserGetError : Exception
    {
        public UserGetError(string message) : base(message)
        {
        }
    }
}