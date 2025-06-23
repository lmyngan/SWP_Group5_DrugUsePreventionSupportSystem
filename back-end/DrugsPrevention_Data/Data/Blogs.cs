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
        [Column("blog_id")]
        public int BlogId { get; set; }
        [Column("author_id")]
        public int AuthorId { get; set; }
        [Column("categories")]
        public int Categories { get; set; }
        [Column("title")]
        public string Title { get; set; }
        [Column("content")]
        public string Content { get; set; }
        [Column("rate")]
        public float Rate { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public Accounts Account { get; set; }
    }
}
