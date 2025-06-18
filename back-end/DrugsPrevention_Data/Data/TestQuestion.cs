using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class TestQuestion
    {
        [Key]
        public int QuestionId { get; set; }
        public int TestId { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }

        [ForeignKey(nameof(TestId))]
        public Test Test { get; set; }
        public ICollection<TestOption> Options { get; set; }
        public ICollection<TestAnswer> Answers { get; set; }
    }
}
