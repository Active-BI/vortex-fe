using Microsoft.EntityFrameworkCore.Storage;

namespace Repository.Interfaces
{
    public interface IDatabaseFuncions
    {
        void SaveChanges();
        IDbContextTransaction BeginTransaction();
    }
}