using FSimple.Models;
using FSimple.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> userManager;
        private AppDbContext _context;

        public UserController( UserManager<ApplicationUser> userManager, AppDbContext context)
        {
            this.userManager = userManager;
            this._context = context;
        }
        [Route("list")]
        public IActionResult Index()
        {
            var users = userManager.Users;
            return Ok(users);
        }
        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromForm] RegisterViewModel model)
        {
            if (model == null)

                throw new NullReferenceException("Model is null");


            if (model.Password != model.PasswordConfirm)

                return Ok(new UserManagerResponse
                {
                    Message = "Password doesn't match",
                    IsSuccess = false,
                });

            var user = new ApplicationUser
            {
                UserName = model.Email,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                Email = model.Email
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "Customer");

                return Ok(new UserManagerResponse
                {
                    Message = "User created successfully.",
                    IsSuccess = true,
                });
            }
            return Ok(new UserManagerResponse
            {
                Message = "User is not Created",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            });
        }
        [Route("Get/{id}")]
        [HttpGet]
        public async Task<IActionResult> Get(string id)
        {
            if (string.IsNullOrEmpty(id))
                return NotFound();
            var iser = await userManager.FindByIdAsync(id);
            if (iser == null)
                return NotFound();
            return Ok(iser);
        }

        [Route("Update")]
        public async Task<IActionResult> Update([FromForm] ApplicationUser model)
        {
            var iser = await userManager.FindByIdAsync(model.Id);
            if (iser == null)
            {
                return Ok(false);
            }
            iser.Email = model.Email;
            iser.FullName = model.FullName;
            iser.UserName=model.Email;
            iser.PhoneNumber = model.PhoneNumber;
            var res = await userManager.UpdateAsync(iser);
            if (res.Succeeded)
            {
                return Ok(true);
            }
            return Ok(false);
        }


        [Route("Delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (string.IsNullOrEmpty(id))
                return NotFound();
            var user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                var requests = _context.Requests.Where(s => s.UserId == id).ToList();
                foreach (var otem in requests)
                {
                    var itemss = _context.RequestItems.Where(s => s.RequestId == otem.Id).ToList();
                    if (itemss != null)
                    {

                        _context.RequestItems.RemoveRange(itemss);
                        _context.SaveChanges();
                    }
                    _context.Requests.Remove(otem);
                    _context.SaveChanges();
                }

                await userManager.DeleteAsync(user);
                return Ok(true);
            }

            return Ok(false);
        }
    }
}
