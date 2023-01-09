using EbeddedApi.Models;

namespace Repository.Interfaces
{
    public interface IRolesRepository
    {
        IEnumerable<UserPbiRls> joinRoles(IEnumerable<UserPbiRls> Users);
    }
}
