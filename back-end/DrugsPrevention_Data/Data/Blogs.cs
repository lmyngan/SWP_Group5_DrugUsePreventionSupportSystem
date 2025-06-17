using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Blogs
    {
        [Key]
        public int BlogId { get; set; }
        public int AuthorId { get; set; }
        public int Categories { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public float Rate { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public Accounts Account { get; set; }
    }
}
