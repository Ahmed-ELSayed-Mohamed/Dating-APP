using API.Interfaces;
using API.Models.Data;
using API.Models.Entites;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extentions
{
    public static class ApplicationServerExtenion
    {
        
   
        public static IServiceCollection AddApplicationServerExtenion(this IServiceCollection services, 
            IConfiguration config)
        {


              services.AddDbContext<DataContext>(options=>{
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
          
          services.AddScoped<ITokenService,TokenService>();
           
            return services;
        }
    }
    }
