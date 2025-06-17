using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    [Table("TestAnswer")]
    public class TestAnswer
    {
        [Key]
        [Column("answer_id")]
        public int AnswerId { get; set; }
        [Column("result_id")]
        public int ResultId { get; set; }
        [Column("question_id")]
        public int QuestionId { get; set; }
        [Column("answer_text")]
        public string AnswerText { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(ResultId))]
        public TestResult Result { get; set; }
        [ForeignKey(nameof(QuestionId))]
        public TestQuestion Question { get; set; }
    }
}
