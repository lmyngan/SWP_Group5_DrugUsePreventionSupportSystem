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
        public int TestId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedBy { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public Accounts Account { get; set; }
        public ICollection<TestQuestion> Questions { get; set; }
        public ICollection<TestResult> Results { get; set; }
    }
}
