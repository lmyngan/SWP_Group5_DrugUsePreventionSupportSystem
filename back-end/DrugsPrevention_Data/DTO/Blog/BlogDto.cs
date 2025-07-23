using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Blog
{
    public class BlogDto
    {
        public int BlogId { get; set; }
        public int AuthorId { get; set; }
        public int Categories { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public float Rate { get; set; }
        public int RatingCount { get; set; }
        public DateTime CreatedAt { get; set; }

        public string AuthorAccountname { get; set; }
        public string AuthorFullName { get; set; }
    }
}
