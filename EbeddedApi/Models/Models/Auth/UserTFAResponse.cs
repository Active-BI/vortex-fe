namespace EbeddedApi.Models.Auth
{
    public class UserTFAResponse
    {
        public string token { get; set; }
        public string QrCodeImageUrl { get; set; }
        public string ManualEntryCode { get; set; }
    }
}