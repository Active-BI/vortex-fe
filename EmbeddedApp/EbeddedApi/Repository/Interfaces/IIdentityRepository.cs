using EbeddedApi.Models;
using EbeddedApi.Models.Auth;

namespace Repository.Interfaces
{
    public interface IIdentityRepository
    {
        Task<IEnumerable<User>> Get();

        Task Add(User user);
    }
}
