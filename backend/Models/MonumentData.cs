using System;

namespace fortress_in_pixels.Models
{
    public class MonumentData
    {
        public int Id { get; set; } // Primary key
        public string Title { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Slug { get; set; }
        public DateTime Date { get; set; }
    }
}
