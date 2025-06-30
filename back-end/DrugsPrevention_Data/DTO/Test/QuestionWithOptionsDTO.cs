using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class TestQuestionWithAnswersDTO
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string QuestionType { get; set; }
        public List<TestOptionDTO> Options { get; set; }
        public List<TestAnswerDTO> Answers { get; set; }
    }
    public class TestOptionDTO
    {
        public int OptionId { get; set; }
        public string OptionText { get; set; }
        public int Score { get; set; }
    }

    public class TestAnswerDTO
    {
        public int AnswerId { get; set; }
        public string AnswerText { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
