using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class TestSubmissionDTO
    {
        public int? AccountId { get; set; } // null nếu là guest
        public int TestId { get; set; }
        public List<QuestionAnswerDTO> Answers { get; set; }
    }
}
