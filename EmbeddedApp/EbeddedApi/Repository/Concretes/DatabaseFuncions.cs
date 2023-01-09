using EbeddedApi.Context;
using EbeddedApi.Models;
using EbeddedApi.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.PowerBI.Api;
using Repository.Interfaces;

namespace Repository.Concretes
{
    public class DatabaseFuncions : IDatabaseFuncions
    {
        private readonly UserPbiRlsContext _userPbiContext;
        public DatabaseFuncions(UserPbiRlsContext userPbiContext)
        {
            _userPbiContext = userPbiContext;
        }

        public IDbContextTransaction BeginTransaction()
        {
            return this._userPbiContext.Database.BeginTransaction();
        }

        public async void SaveChanges()
        {
            await this._userPbiContext.SaveChangesAsync();
        }
    }
}
