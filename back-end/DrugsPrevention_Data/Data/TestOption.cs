using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class TestOption
    {
        [Key]
        public int OptionId { get; set; }
        public int QuestionId { get; set; }
        public string OptionText { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public TestQuestion Question { get; set; }
    }
}
