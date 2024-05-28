using Microsoft.EntityFrameworkCore;
using fortress_in_pixels.Data;

namespace fortress_in_pixels
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure PostgreSQL connection
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<MyDbContext>(options =>
                options.UseNpgsql(connectionString));

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://localhost:3000") // Adjust according to your Next.js development URL
                                      .AllowAnyMethod()
                                      .AllowAnyHeader()
                                      .AllowCredentials()); // If you need to allow cookies
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Enable CORS
            app.UseCors("AllowSpecificOrigin");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
