using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Models.Domain
{
    public class RequestItem
    {
        public int Id { get; set; }
        public int ServiceId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string AttachedFile { get; set; }
        public int RequestId { get; set; }
        public virtual Request Request { get; set; }
    }
}
