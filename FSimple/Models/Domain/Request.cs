using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Models.Domain
{
    public class Request
    {
        public int Id { get; set; }
        public string PaymentType { get; set; }
        public string OrderStatus { get; set; }
        public string UserId { get; set; }
        public string AttachFile { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<RequestItem> RequestItems { get; set; }
    }
}
