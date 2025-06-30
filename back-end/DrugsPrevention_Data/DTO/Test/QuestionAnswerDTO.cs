using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class QuestionAnswerDTO
    {
        public int QuestionId { get; set; }
        public int? OptionId { get; set; } 
        public string AnswerText { get; set; } 
    }
}

