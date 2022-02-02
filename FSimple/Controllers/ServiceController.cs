using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FSimple.Models;
using FSimple.Models.Domain;

namespace FSimple.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Service
        [Route("GetServices")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            return await _context.Services.ToListAsync();
        }

        // GET: api/Service/5
        [Route("Get/{id}")]
        [HttpGet]
        public async Task<ActionResult<ServiceViewModel>> GetService(int id)
        {
            var service = await _context.Services.FindAsync(id);


            if (service == null)
            {
                return NotFound();
            }

            ServiceViewModel model = new ServiceViewModel()
            {
                Id = service.Id,
                Name_AR = service.Name_AR,
                Name_EN = service.Name_EN,
                CategoryId = service.CategoryId,
                CategoryNameEN = service.CategoryId == 0 ? "" : _context.Categories.FirstOrDefault(d => d.Id == service.CategoryId).Name_EN,
                CategoryNameAR = service.CategoryId == 0 ? "" : _context.Categories.FirstOrDefault(d => d.Id == service.CategoryId).Name_AR,
            };
            return model;
        }

        [Route("ServiceByCatagory/{id}")]
        [HttpGet]
        public dynamic GetServiceByCatagory(int id)
        {
            var service =  _context.Services.Where(f=>f.CategoryId==id).ToList();

            List<ServiceViewModel> models = new List<ServiceViewModel>();
            if (service.Count==0)
            {
                return 1;
            }

            foreach (var Item in service)
            {
                ServiceViewModel model = new ServiceViewModel()
                {
                    Id = Item.Id,
                    Name_AR = Item.Name_AR,
                    Name_EN = Item.Name_EN,
                    CategoryId = Item.CategoryId,
                    IsChecked = false,
                    CategoryNameEN = Item.CategoryId == 0 ? "" : _context.Categories.FirstOrDefault(d => d.Id == Item.CategoryId).Name_EN,
                    CategoryNameAR = Item.CategoryId == 0 ? "" : _context.Categories.FirstOrDefault(d => d.Id == Item.CategoryId).Name_AR,
                };
                models.Add(model);
            }   
            return models;
        }


        // PUT: api/Service/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("PutService")]
        [HttpPost]
        public async Task<IActionResult> PutService([FromForm] Service service)
        {
            if (service.Id==0)
            {
                return BadRequest();
            }

            _context.Entry(service).State = EntityState.Modified;
            await _context.SaveChangesAsync();
           
            return Ok(true);
        }

        // POST: api/Service
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Route("PostService")]
        [HttpPost]
        public async Task<ActionResult<Service>> PostService([FromForm]Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetService", new { id = service.Id }, service);
        }

        // DELETE: api/Service/5
        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult<Service>> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound();
            }

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return service;
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.Id == id);
        }
    }
}
