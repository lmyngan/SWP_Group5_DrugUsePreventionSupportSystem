using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Blog
{
    public class CreateBlogDto
    {
        [Required]
        public int AuthorId { get; set; }
        public int Categories { get; set; }
        [Required]
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
