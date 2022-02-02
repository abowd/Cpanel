using System;

namespace FSimple.Models
{
    public class OrderViewModel
    {
        public int Id { get; set; }
        public string PaymentType { get; set; }
        public string OrderStatus { get; set; }
        public string AttachedFile { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public string CreateDate { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int RequestId { get; set; }
    }
}
