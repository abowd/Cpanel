using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Models
{
    public class RequestItemViewModel
    {
        public int Id { set; get; }
        public int ServiceId { set; get; }
        public string EndDate { set; get; }
        public string StartDate { set; get; }
        public string Name_AR { set; get; }
        public string Name_EN { set; get; }
        public string ImagePreviewUrl { set; get; }
        public int RequestId { get; set; }
    }
}
