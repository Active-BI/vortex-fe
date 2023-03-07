using EbeddedApi.Models;

namespace Repository.Interfaces
{
    public interface IUserPbiRlsRepository
    {
        Task<IEnumerable<UserPbiRls>> GetFromAdmin();
        Task<UserPbiRls> GetById(Guid id);
        Task AddAsync(UserPbiRls entity);
        Task Delete(UserPbiRls entity);
        Task Put(UserPbiRls user);
    }
}
