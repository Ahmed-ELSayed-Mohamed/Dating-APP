using System.ComponentModel.DataAnnotations;

namespace API.Models.DTOS
{
    public class DtoRegister
    {
        [Required]
        public string UserName { get; set; } 
        [Required]        
        public string Password { get; set; }
    }
}