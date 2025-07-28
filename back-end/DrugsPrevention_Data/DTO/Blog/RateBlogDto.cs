using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Blog
{
    public class RateBlogDto
    {
        [Required(ErrorMessage = "BlogId là bắt buộc")]
        public int BlogId { get; set; }
        
        [Required(ErrorMessage = "Rating là bắt buộc")]
        [Range(0, 5, ErrorMessage = "Rating phải nằm trong khoảng từ 0 đến 5")]
        public float Rating { get; set; }
    }
}
