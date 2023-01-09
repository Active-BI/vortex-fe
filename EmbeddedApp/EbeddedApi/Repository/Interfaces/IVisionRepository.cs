using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using Models.Models.Dtos;

namespace Repository.Interfaces
{
    public interface IVisionRepository
    {
        List<UserVisions> GetById(Guid id);
        Task RemoveRange(List<UserVisions> request);
        IEnumerable<Vision> Get();
        Task AddVisions(UserDto request, UserPbiRls userPbi);
    }
}
