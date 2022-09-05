using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Menu
{
    public class MenuSubItem
    {
        public Guid Id { get; set; }
        public string Path { get; set; }
        public string Title { get; set; }
        public string LongTitle { get; set; }
        public string Icon { get; set; }
        public string Class { get; set; }
        public string Context { get; set; }
        public Guid MenuItemId { get; set; }
    }
}