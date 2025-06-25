using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Test
{
    public class UserTestAnswerDTO
    {
        public int QuestionId { get; set; }
        public string QuestionText { get; set; }
        public string SelectedAnswer { get; set; }
        public int? Score { get; set; }
    }
}
