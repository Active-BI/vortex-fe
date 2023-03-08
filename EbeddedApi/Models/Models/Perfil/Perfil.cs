namespace EbeddedApi.Models
{
    public class Perfil
    {
        public Perfil()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }

    }
}