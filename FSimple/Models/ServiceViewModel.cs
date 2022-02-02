using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Models
{
    public class ServiceViewModel
    {
        public int Id { get; set; }
        public string Name_EN { get; set; }
        public string Name_AR { get; set; }
        public int CategoryId { get; set; }
        public string CategoryNameEN{ get; set; }
        public string CategoryNameAR{ get; set; }
        public bool IsChecked { get; set; } = false;
    }
}
