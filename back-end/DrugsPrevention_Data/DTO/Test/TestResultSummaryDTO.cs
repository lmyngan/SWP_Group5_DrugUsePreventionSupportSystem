using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class TestResultSummaryDTO
    {
        public int AccountId { get; set; }
        public int TestId { get; set; }
        public string RiskLevel { get; set; }
        public string Recommendation { get; set; }
        public int Score { get; set; }
        public DateTime AssessedAt { get; set; }
    }

}
