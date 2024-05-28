using System.Collections.Generic;

namespace fortress_in_pixels.Models
{
    public class Monument
    {
        public int Id { get; set; }
        public string ImgUrl { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string BuiltYear { get; set; }
        public string Style { get; set; }
        public List<string> Features { get; set; }
    }
}
