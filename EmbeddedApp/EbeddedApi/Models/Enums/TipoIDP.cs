namespace EbeddedApi.Models.Enums
{
     /// <summary>
    /// Representa qual Identity Provider usar para certificação dos tokens de login no ADFS
    /// Ish = 0, Cli = 1
    /// </summary>   
    public enum TipoIDP
    {
        ISH,
        CLI
    }
}