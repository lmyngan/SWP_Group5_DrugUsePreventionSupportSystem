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
        public int Score { get; set; }  // Tổng điểm
        public List<AnswerResultDTO> Answers { get; set; }  // Danh sách các câu đã trả lời và điểm tương ứng
    }   
}
