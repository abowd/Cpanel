
using FSimple.Models;
using FSimple.Models.Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FSimple.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderRequestController : ControllerBase
    {
        private ApplicationUser _currentUser;
        private readonly AppDbContext _context;
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private HttpContext _httpContext;
        public OrderRequestController(IWebHostEnvironment webHost, AppDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IHttpContextAccessor contextAccessor)
        {
            _context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            _httpContext = contextAccessor.HttpContext;
        }
        // GET: api/<OrderRequestController>

        [Route("GetItem/{id}")]
        [HttpGet]
        public dynamic GetItem(int id)
        {
            var items = _context.RequestItems.Where(h => h.RequestId == id).ToList();
            List<OrderViewModel> models = new List<OrderViewModel>();
            foreach (var item in items)
            {
                OrderViewModel model = new OrderViewModel()
                {
                    Id=item.Id,
                    StartDate = item.StartDate.ToLongDateString(),
                    EndDate = item.EndDate.ToLongDateString(),
                    CreateDate = item.CreateDate.ToLongDateString(),
                    AttachedFile = item.AttachedFile,
                    ServiceId = item.ServiceId,
                    ServiceName = item.ServiceId == 0 ? "" : _context.Services.FirstOrDefault(h => h.Id == item.ServiceId).Name_EN,
                };
                models.Add(model);
            }

            return models;
        }
        [Route("Getorder")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> Getorder()
        {
            List<OrderViewModel> order = new List<OrderViewModel>();
            var user = currentuser();
            var requestList = _context.Requests.Where(h => h.UserId == user.Result.Id).ToList();
            foreach (var item in requestList)
            {
                var reqItem = _context.RequestItems.FirstOrDefault(g => g.RequestId == item.Id);
                OrderViewModel model = new OrderViewModel()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    PaymentType = item.PaymentType,
                    ServiceId = reqItem.ServiceId,
                    ServiceName = reqItem.ServiceId == 0 ? "" : _context.Services.FirstOrDefault(h => h.Id == reqItem.ServiceId).Name_EN,
                    StartDate = reqItem.StartDate.ToLongDateString(),
                    EndDate = reqItem.EndDate.ToLongDateString(),
                    CreateDate = reqItem.CreateDate.ToLongDateString(),
                    OrderStatus = item.OrderStatus,
                    AttachedFile = item.AttachFile,
                    RequestId = reqItem.Id,
                    UserName = user.Result.FullName,
                    Email = user.Result.Email,

                };
                order.Add(model);
            }
            return order;
        }


        [Route("Getneworder")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> Getneworder()
        {
            List<OrderViewModel> order = new List<OrderViewModel>();
            var user = currentuser();
            var requestList = _context.Requests.Where(h => h.OrderStatus.Trim() == "New").ToList().OrderByDescending(s => s.Id);
            foreach (var item in requestList)
            {
                var reqItem = _context.RequestItems.FirstOrDefault(g => g.RequestId == item.Id);
                var username = await getuser(item.UserId);

                OrderViewModel model = new OrderViewModel()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    PaymentType = item.PaymentType,
                    ServiceId = reqItem.ServiceId,
                    ServiceName = reqItem.ServiceId == 0 ? "" : _context.Services.FirstOrDefault(h => h.Id == reqItem.ServiceId).Name_EN,
                    StartDate = reqItem.StartDate.ToLongDateString(),
                    EndDate = reqItem.EndDate.ToLongDateString(),
                    CreateDate = reqItem.CreateDate.ToLongDateString(),
                    OrderStatus = item.OrderStatus,
                    AttachedFile = item.AttachFile,
                    RequestId = reqItem.Id,
                    UserName = username.FullName,
                    Email = username.Email,
                };
                order.Add(model);
            }
            return order;
        }


        [Route("GetAllorder")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> GetAllorder()
        {
            List<OrderViewModel> order = new List<OrderViewModel>();
            var user = currentuser();
            var requestList = _context.Requests.ToList().OrderByDescending(s => s.Id);
            foreach (var item in requestList)
            {
                var reqItem = _context.RequestItems.FirstOrDefault(g => g.RequestId == item.Id);
                var username = await getuser(item.UserId);
                OrderViewModel model = new OrderViewModel()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    PaymentType = item.PaymentType,
                    ServiceId = reqItem.ServiceId,
                    ServiceName = reqItem.ServiceId == 0 ? "" : _context.Services.FirstOrDefault(h => h.Id == reqItem.ServiceId).Name_EN,
                    StartDate = reqItem.StartDate.ToLongDateString(),
                    EndDate = reqItem.EndDate.ToLongDateString(),
                    CreateDate = reqItem.CreateDate.ToLongDateString(),
                    OrderStatus = item.OrderStatus,
                    AttachedFile = item.AttachFile,
                    RequestId = reqItem.Id,
                    UserName = username.FullName,
                    Email = username.Email,
                };
                order.Add(model);
            }
            return order;
        }



        [Route("OrderStatus")]
        [HttpPost]
        public async Task<ActionResult> OrderStatus([FromForm] OrderViewModel model)
        {
            if (model.Id == 0)
            {
                return BadRequest();
            }
            Request req = new Request();
            req = _context.Requests.Find(model.Id);
            req.OrderStatus = model.OrderStatus;
            _context.Entry(req).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();

        }
        // POST api/<OrderRequestController>
        [Route("NewOrderRequest")]
        [HttpPost]
        public async Task<ActionResult<RequestViewModel>> NewOrderRequest([FromForm]RequestViewModel model)
        {
            
            Request req = new Request();
            var file = model.File;
            if (file != null)
            {
                Guid nameguid = Guid.NewGuid();
                string fileName = "order" + nameguid;
                string extension = Path.GetExtension(model.File.FileName);
                fileName = fileName + extension;
                string path = $"ClientApp/public/assets/useruplode/{fileName}";
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                req.AttachFile = "assets/useruplode/" + fileName;
            }
            else
            {
                req.AttachFile = "";
            }
            var user = currentuser();
            req.PaymentType = model.PaymentType;
            req.UserId = user.Result.Id;
            req.OrderStatus = "New";
            req.Date = DateTime.Now;
            _context.Requests.Add(req);
            await _context.SaveChangesAsync();
            model.Id = req.Id;
            return model;
        }

        [Route("itemRequest")]
        [HttpPost]
        public dynamic itemRequest(RequestItemViewModel model)
        {
            RequestItem item = new RequestItem();
            item.ServiceId = model.ServiceId;
            item.CreateDate = DateTime.Now;
            item.StartDate = Convert.ToDateTime(model.StartDate);
            item.EndDate = Convert.ToDateTime(model.EndDate); 
            item.RequestId =model.RequestId;
            _context.RequestItems.Add(item);
             _context.SaveChanges();
            model.Id = item.Id;
            return model;
        }

            public async Task<ApplicationUser> currentuser()
        {
            var contextUser = _httpContext.User;
            if (contextUser != null)
            {
                _currentUser = await userManager.GetUserAsync(contextUser);
            }
            return _currentUser;
        }


        public async Task<ApplicationUser> getuser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            return user;
        }
        // PUT api/<OrderRequestController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderRequestController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [Route("RequestFileUplode")]
        [HttpPost]
        public async Task<ActionResult<RequestFile>> RequestFileUplode([FromForm] RequestFile model)
        {

            RequestItem req = _context.RequestItems.Find(model.Id);
            var file = model.File;
            if (file != null)
            {
                Guid nameguid = Guid.NewGuid();
                string fileName = "order" + nameguid;
                string extension = Path.GetExtension(model.File.FileName);
                fileName = fileName + extension;
                string path = $"ClientApp/public/assets/useruplode/{fileName}";
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                req.AttachedFile = "assets/useruplode/" + fileName;
            }

            _context.Entry(req).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return model;
        }

        public class RequestFile
        {
            public int Id { set; get; }
            public IFormFile File { get; set; }
        }
    }
}
