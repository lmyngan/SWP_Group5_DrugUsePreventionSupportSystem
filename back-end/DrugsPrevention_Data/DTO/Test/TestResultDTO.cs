using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class TestResultDTO
    {
        public string RiskLevel { get; set; }
        public string Recommendation { get; set; }
        public int Score { get; set; }
        public List<AnswerResultDTO> Answers { get; set; }
    }   
}
