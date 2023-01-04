using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using EbeddedApi.Models.Auth;
using EbeddedApi.Models.Menu;

namespace EbeddedApi.Models
{
public class UserPbiRls {

    public UserPbiRls()
    {
        Id= Guid.NewGuid();
    }
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Nome { get; set; }
    public string Identificacao { get; set; }
    public string Empresa { get; set; }
    public string Perfil {get;set;}
    public string EmailContato { get; set; }
    [NotMapped]
    public DateTime? DataUltimoAcesso { get; set; }
    public virtual List<UserVisions> UserVisions { get; set; }
    public virtual List<UserMenu> UserMenus { get; set; }

}
}