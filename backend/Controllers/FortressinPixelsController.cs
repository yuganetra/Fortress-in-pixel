using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using fortress_in_pixels.Data;
using fortress_in_pixels.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;

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

        //[HttpGet("search")]
        //public async Task<IActionResult> SearchMonuments(string query)
        //{
        //    if (string.IsNullOrEmpty(query))
        //    {
        //        return BadRequest("Query parameter is required.");
        //    }

        //    var upperQuery = query.ToUpper();

        //    var results = await _context.Monuments
        //        .Where(m => m.Name.ToUpper().Contains(upperQuery) || m.Description.ToUpper().Contains(upperQuery))
        //        .ToListAsync();

        //    return Ok(results);
        //}
        [HttpGet("search")]
        public async Task<IActionResult> Search(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Query parameter is required.");
            }

            var upperQuery = query.ToUpper();

            // Search in local database
            var localResults = await _context.Monuments
                .Where(m => m.Name.ToUpper().Contains(upperQuery) || m.Description.ToUpper().Contains(upperQuery))
                .ToListAsync();

            if (localResults.Any())
            {
                return Ok(localResults);
            }
            else
            {
                int limit = 1; // Maximum number of results

                // If no results found in the local database, search using Wikimedia API
                var encodedQuery = Uri.EscapeDataString(query);
                var apiUrl = $"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={encodedQuery}&format=json";
                string searchUrl = $"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={encodedQuery}+monument&srprop=snippet&format=json";

                using (var httpClient = new HttpClient())
                {
                    var searchResponse = await httpClient.GetAsync(searchUrl);
                    var searchContent = await searchResponse.Content.ReadAsStringAsync();

                    // Parse JSON response for search
                    JObject searchJson = JObject.Parse(searchContent);
                    var searchResults = searchJson["query"]["search"];

                    var Monument = new List<Monument>(); // Create a list to store Monument objects

                    foreach (var result in searchResults)
                    {
                        int pageId = (int)result["pageid"];
                        string title = result["title"].ToString();

                        // Construct URL to fetch full article content
                        string articleUrl = $"https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=true&explaintext=true&piprop=original&pageids={pageId}&format=json";
                        var articleResponse = await httpClient.GetAsync(articleUrl);
                        var articleContent = await articleResponse.Content.ReadAsStringAsync();
                        JObject articleJson = JObject.Parse(articleContent);

                        if (articleJson["query"]?["pages"]?[pageId.ToString()]?["original"]?["source"] != null)
                        {
                            // Extract the image URL
                            string snippet = result["snippet"].ToString();
                            string snippetWithoutHtml = Regex.Replace(snippet, "<.*?>", string.Empty);

                            string articleExtract = articleJson["query"]["pages"][pageId.ToString()]["extract"].ToString();
                            string imageUrl = articleJson["query"]["pages"][pageId.ToString()]["original"]["source"].ToString();

                            // Create Monument object and add it to the list
                            Monument place = new Monument
                            {
                                Id = pageId,
                                Name = title,
                                Description = articleExtract,
                                ImgUrl = imageUrl,
                            };

                            Monument.Add(place); // Add Monument object to the list
                        }
                    }

                    return Ok(Monument); // Return the list of Monument objects
                }
            }
        }
    }
}
