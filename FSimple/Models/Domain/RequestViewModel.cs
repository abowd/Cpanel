using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Models.Domain
{
    public class RequestViewModel
    {
        public int Id { get; set; }
        public string PaymentType { get; set; }
        public IFormFile File { get; set; }
    }
}
