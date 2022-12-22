using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Models.Menu;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EbeddedApi.Services
{
    public class MenuItemService
    {
         private readonly ILogger<MenuItemService> _logger;
        private readonly IdentityContext identityContext;
        private readonly UserPbiRlsContext userPbiContext;


        public MenuItemService(ILogger<MenuItemService> logger,
                                  UserPbiRlsContext userPbiContext,
                               IdentityContext identityContext)
        {
            _logger = logger;
            this.identityContext = identityContext;
            this.userPbiContext = userPbiContext;
        }

        public async Task<IEnumerable> GetMenuItens(){
            
            var result = await this.userPbiContext.MenuItems
                                .AsNoTracking()
                                .OrderBy(x => x.Title)
                                .Select(x => new { x.Id, x.Title, x.MenuSubItens} )
                                .ToListAsync();
            
            return result;
        }


        public async Task<MenuItem> GetMenuItensById(Guid id)
        {

            var result = await this.userPbiContext.MenuItems
                                .AsNoTracking()
                                .FirstOrDefaultAsync(x => x.Id == id);

            return result;
        }
       
        public async Task<MenuItem> PutMenuItens(MenuItemRequest menuItem, Guid ItemId)
        {

            var menu = new MenuItem()
            {
                Id = ItemId,
                Class = menuItem.Class,
                Context = menuItem.Context,
                LongTitle = menuItem.LongTitle,
                Title = menuItem.Title,
                Icon = menuItem.Icon,
                Path = menuItem.Path,
            };
            var result = this.userPbiContext.MenuItems.Update(menu);
            this.userPbiContext.SaveChanges();

            return menu;
        }

        public async Task DelMenuItem(Guid id)
        {
            if (this.userPbiContext.UserMenus.Any(x => x.MenuItemId == id))
            {
                var userMenus = this.userPbiContext.UserMenus.Where(x => x.MenuItemId == id).ToList();
                this.userPbiContext.UserMenus.RemoveRange(userMenus);
                this.userPbiContext.SaveChanges();
            }

            var menu = new MenuItem() {
                Id = id
            };
            this.userPbiContext.MenuItems.Remove(menu);
            this.userPbiContext.SaveChanges();
        }

        public async Task<MenuItem> AddMenuItem(MenuItemRequest menuItem)
        {
            var menu = new MenuItem()
            {
                Class = menuItem.Class,
                Context = menuItem.Context,
                LongTitle = menuItem.LongTitle,
                Title = menuItem.Title,
                Icon = menuItem.Icon
            };
            var result = await this.userPbiContext.MenuItems.AddAsync(menu);
            this.userPbiContext.SaveChanges();

            return menu;
        }
    }
}