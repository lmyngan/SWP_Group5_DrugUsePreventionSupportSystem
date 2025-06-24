using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    [Table("TestQuestion")]
    public class TestQuestion
    {
        [Key]
        [Column("question_id")]
        public int QuestionId { get; set; }

        [Column("test_id")]
        public int TestId { get; set; }

        [Column("question_text")]
        public string QuestionText { get; set; }

        [Column("question_type")]
        public string QuestionType { get; set; }

        [ForeignKey(nameof(TestId))]
        public Test Test { get; set; }

        public ICollection<TestOption> Options { get; set; }
        public ICollection<TestAnswer> Answers { get; set; }
    }

}
