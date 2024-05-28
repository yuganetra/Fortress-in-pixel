using Microsoft.EntityFrameworkCore;
using fortress_in_pixels.Models;

namespace fortress_in_pixels.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Monument> Monuments { get; set; }
        public DbSet<MonumentData> MonumentsData { get; set; }
        public DbSet<TouristPlace> TouristPlaces { get; set; }
    }
}
