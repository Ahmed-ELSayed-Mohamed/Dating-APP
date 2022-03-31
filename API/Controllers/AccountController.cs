using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models.Data;
using API.Models.DTOS;
using API.Models.Entites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiControllers
    {

        private readonly DataContext _context;

        private readonly ITokenService _tokenservice ;

        public AccountController(DataContext context, ITokenService tokenservice)
        {
            _tokenservice = tokenservice;
            _context = context;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(DtoRegister RegisterDto)
        {
            if (await UserExits(RegisterDto.UserName))
            {
                return BadRequest("User Name is taken");

            }
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = RegisterDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(RegisterDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto {
                Username=user.UserName,
                Token=_tokenservice.CreateToken(user)
                
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto logindto)
        {

            var user = await _context.Users.SingleOrDefaultAsync
            (x => x.UserName == logindto.UserName);
            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");


            }
             return new UserDto {
                Username=user.UserName,
                Token=_tokenservice.CreateToken(user)
                
            };
        }
        private async Task<bool> UserExits(string username)
        {

            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }

    }
}