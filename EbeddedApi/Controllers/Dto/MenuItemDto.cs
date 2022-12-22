namespace EbeddedApi.Controllers.Dto
{
    public class MenuItemRequest
    {
        public string Path { get; set; }
        public string Title { get; set; }
        public string LongTitle { get; set; }
        public string Icon { get; set; }
        public string Class { get; set; }
        public string Context { get; set; }
    }
}