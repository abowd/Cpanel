using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Models.Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Name_EN { get; set; }
        public string Name_AR { get; set; }
        public virtual ICollection<Service> Services { get; set; }
    }
}
