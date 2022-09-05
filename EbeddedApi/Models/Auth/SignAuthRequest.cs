using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Auth
{
    public class SignAuthRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
       
        public string CaptchaResponse { get; set; }
    }
}