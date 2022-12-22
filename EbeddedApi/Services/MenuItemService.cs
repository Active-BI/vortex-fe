using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EbeddedApi.Context;
using EbeddedApi.Controllers.Dto;
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using EbeddedApi.Models.Menu;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace EbeddedApi.Services
{
    public class MenuItemService
    {
         private readonly ILogger<MenuItemService> _logger;
        private readonly UserPbiRlsContext userPbiContext;
        private readonly IdentityContext identityContext;
        private readonly MenuItemContext MenuItemContext;

        public MenuItemService(ILogger<MenuItemService> logger,
                               UserPbiRlsContext userPbiContext,
                               IdentityContext identityContext)
        {
            _logger = logger;
            this.userPbiContext = userPbiContext;
            this.identityContext = identityContext;
        }

        public async Task<IEnumerable> GetMenuItens(){
            
            var result = await this.MenuItemContext.MenuItems
                                .AsNoTracking()
                                .OrderBy(x => x.Title)
                                .Select(x => new { x.Id, x.Title, x.MenuSubItens} )
                                .ToListAsync();
            
            return result;
        }


        public async Task<MenuItem> GetMenuItensById(Guid id)
        {

            var result = await this.MenuItemContext.MenuItems
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
            var result = this.MenuItemContext.MenuItems.Update(menu);
            this.MenuItemContext.SaveChanges();

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
            this.MenuItemContext.MenuItems.Remove(menu);
            this.MenuItemContext.SaveChanges();
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
            var result = await this.MenuItemContext.MenuItems.AddAsync(menu);
            this.MenuItemContext.SaveChanges();

            return menu;
        }
    }
}