using System;
using System.Collections.Generic;

namespace EbeddedApi.Models.Menu
{
    public class UserMenu
    {
        public Guid Id { get; set; }
        public Guid UserPbiRelsId { get; set; }
        public Guid MenuItemId { get; set; }
        public virtual MenuItem Menu { get; set; }

    }
}