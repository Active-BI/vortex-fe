namespace EbeddedApi.Models.Enums
{

    /// <summary>
    /// Representa qual Rota de autenticação seguir no Vision Portal
    /// Ish = 0, Cli = 1
    /// Auth = 0, ADFS = 1
    /// </summary>   
    public enum MetodoAutenticacao
    {
        Auth,
        ADFS
    }
}