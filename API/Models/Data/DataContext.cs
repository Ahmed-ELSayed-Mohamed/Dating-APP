

using API.Models.Entites;
using Microsoft.EntityFrameworkCore;

namespace API.Models.Data
{
    public class DataContext : DbContext
    {
        public DataContext( DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
    }
}