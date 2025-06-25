using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    [Table("TestOption")]
    public class TestOption
    {
        [Key]
        [Column("option_id")]
        public int OptionId { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [Column("option_text")]
        public string OptionText { get; set; }

        [Column("score")]
        public int Score { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public TestQuestion Question { get; set; }
    }

}
