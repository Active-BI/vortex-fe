using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models
{
    public class Vision
    {
        public Vision()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }

        // [NotMapped]
        // public string NormalizedName {set => this.Name.ToUpper(); get => NormalizedName; }
    }
}