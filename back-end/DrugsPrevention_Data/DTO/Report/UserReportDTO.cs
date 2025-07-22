using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Report
{
    public class UserReportDTO
    {
        public int AccountId { get; set; }
        public string FullName { get; set; }
        public int ParticipationCount { get; set; }
    }
}
