using API.Models.Entites;

namespace API.Interfaces
{
    public interface ITokenService
    {
         public string CreateToken(AppUser appuser);
    }
}