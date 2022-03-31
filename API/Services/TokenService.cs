using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using API.Models.Entites;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey  _key;
        public TokenService(IConfiguration configuration)
        {
            _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"])); 
        }

        public string CreateToken(AppUser appuser)
        {
           var claims = new List<Claim>{
               new Claim(JwtRegisteredClaimNames.NameId, appuser.UserName)

           };
           var creds= new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
           var tokenDeScriptor= new SecurityTokenDescriptor{
               Subject=new ClaimsIdentity(claims),
               Expires= DateTime.Now.AddDays(7),
               SigningCredentials=creds,
           };
         var tokenhandelr= new JwtSecurityTokenHandler();
         var token =tokenhandelr.CreateToken(tokenDeScriptor);
         return tokenhandelr.WriteToken(token);  
        }
    }
}