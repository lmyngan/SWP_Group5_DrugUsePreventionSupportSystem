using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class AnswerResultDTO
    {
        public int QuestionId { get; set; }
        public string AnswerText { get; set; }
        public int? Score { get; set; }
    }
}
