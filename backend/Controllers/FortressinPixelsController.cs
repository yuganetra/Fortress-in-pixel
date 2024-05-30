using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fortress_in_pixels.Data;
using fortress_in_pixels.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace fortress_in_pixels.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MyEntitiesController : ControllerBase
    {
        private readonly MyDbContext _context;

        public MyEntitiesController(MyDbContext context)
        {
            _context = context;
        }

        // Monuments Endpoints

        [HttpGet("monuments")]
        public async Task<ActionResult<IEnumerable<Monument>>> GetMonuments()
        {
            return await _context.Monuments.ToListAsync();
        }

        [HttpGet("monuments/{id}")]
        public async Task<ActionResult<Monument>> GetMonument(int id)
        {
            var monument = await _context.Monuments.FindAsync(id);

            if (monument == null)
            {
                return NotFound();
            }

            return monument;
        }

        [HttpPost("monuments")]
        public async Task<ActionResult<Monument>> PostMonument(Monument monument)
        {
            _context.Monuments.Add(monument);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMonument), new { id = monument.Id }, monument);
        }

        // MonumentData Endpoints

        [HttpGet("monumentdata")]
        public async Task<ActionResult<IEnumerable<MonumentData>>> GetMonumentsData()
        {
            return await _context.MonumentsData.ToListAsync();
        }

        [HttpGet("monumentdata/{id}")]
        public async Task<ActionResult<MonumentData>> GetMonumentData(int id)
        {
            var monumentData = await _context.MonumentsData.FindAsync(id);

            if (monumentData == null)
            {
                return NotFound();
            }

            return monumentData;
        }

        [HttpPost("monumentdata")]
        public async Task<ActionResult<MonumentData>> PostMonumentData(MonumentData monumentData)
        {
            _context.MonumentsData.Add(monumentData);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMonumentData), new { id = monumentData.Title }, monumentData);
        }

        // TouristPlaces Endpoints

        [HttpGet("touristplaces")]
        public async Task<ActionResult<IEnumerable<TouristPlace>>> GetTouristPlaces()
        {
            return await _context.TouristPlaces.ToListAsync();
        }

        [HttpGet("touristplaces/{id}")]
        public async Task<ActionResult<TouristPlace>> GetTouristPlace(int id)
        {
            var touristPlace = await _context.TouristPlaces.FindAsync(id);

            if (touristPlace == null)
            {
                return NotFound();
            }

            return touristPlace;
        }

        [HttpPost("touristplaces")]
        public async Task<ActionResult<TouristPlace>> PostTouristPlace(TouristPlace touristPlace)
        {
            _context.TouristPlaces.Add(touristPlace);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTouristPlace), new { id = touristPlace.Title }, touristPlace);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMonuments(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Query parameter is required.");
            }
            
            var upperQuery = query.ToUpper();

            var results = await _context.Monuments
                .Where(m => m.Name.ToUpper().Contains(upperQuery) || m.Description.ToUpper().Contains(upperQuery))
                .ToListAsync();

            return Ok(results);
        }

    }
}
