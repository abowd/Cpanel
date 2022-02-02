using FSimple.Models;
using FSimple.Models.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FSimple.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private RoleManager<IdentityRole> roleManager;
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private IConfiguration configuration;

        public AuthController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync(LoginViewModel model)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return Ok(new UserManagerResponse { Message = "Wrong Creadentials", IsSuccess = false });
                }
                var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);
                if (result.Succeeded)
                {

                    var claims = new[] {
                new Claim("Email" ,model.Email),
                new Claim("Name" ,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id)
                };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AuthSetting:Key"]));
                    var token = new JwtSecurityToken
                    (
                        issuer: configuration["AuthSetting:Audience"],
                        audience: configuration["AuthSetting:Audience"],
                        claims: claims,
                        expires: DateTime.Now.AddDays(30),
                        signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                    );
                    string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);
                    var rolename = "Customer";
                    if (await userManager.IsInRoleAsync(user, "Admin"))
                        rolename = "Admin";


                    return Ok(new UserManagerResponse
                    {
                        Message = tokenAsString,
                        IsSuccess = true,
                        RoleName = rolename,
                        ExpireDate = DateTime.Today.AddDays(20)
                    });
                }
                return Ok(new UserManagerResponse { Message = "Wrong Password", IsSuccess = false });
            }
            catch (Exception ex)
            {

                throw;
            }

        }

        [Authorize]
        [HttpGet("GetUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var contextUser = HttpContext.User;
            ApplicationUser _currentUser = await userManager.GetUserAsync(contextUser);
            return Ok(_currentUser);
        }
        [HttpGet("Logout")]
        public async Task<IActionResult> Logout()
        {

            await signInManager.SignOutAsync();
            return Ok(true);

        }
    }
}
