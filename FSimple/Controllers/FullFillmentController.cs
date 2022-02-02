using FSimple.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FSimple.Controllers
{
    public class FullFillmentController : Controller
    {
        private RoleManager<IdentityRole> roleManager;
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;

        public FullFillmentController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        public async Task<IActionResult> Index()
        {
            var roles =  roleManager.Roles;
            if (roles.Count() > 0)
            {
                return View();
            }
            IdentityRole role1 = new IdentityRole
            {
                Name = "Admin"
            };
            IdentityRole role2 = new IdentityRole
            {
                Name = "Customer"
            };
            await roleManager.CreateAsync(role1);
            await roleManager.CreateAsync(role2);
            ApplicationUser user = new ApplicationUser()
            {
                UserName = "Admin",
                Email = "admin@mail.com",
                PhoneNumber = "12345678",

            };
            await userManager.CreateAsync(user, "Admin@1212");
            await userManager.AddToRoleAsync(user, "Admin");
            return View();
        }
    }
}
