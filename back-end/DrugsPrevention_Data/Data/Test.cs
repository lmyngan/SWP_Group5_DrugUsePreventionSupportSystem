using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Test
    {
        [Key]
        [Column("test_id")]
        public int TestId { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("created_by")]
        public int CreatedBy { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public Accounts Account { get; set; }

        public ICollection<TestQuestion> Questions { get; set; }
        public ICollection<TestResult> Results { get; set; }
    }

}
