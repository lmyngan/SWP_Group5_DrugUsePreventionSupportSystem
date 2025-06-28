using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Blog
{
    public class UpdateBlogDto : CreateBlogDto
    {
        public int BlogId { get; set; }
    }
}
