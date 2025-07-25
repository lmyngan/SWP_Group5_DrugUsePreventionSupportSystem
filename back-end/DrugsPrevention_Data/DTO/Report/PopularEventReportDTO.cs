using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Report
{
    public class PopularEventReportDTO
    {
        public int EventId { get; set; }
        public string EventName { get; set; }
        public int TotalParticipants { get; set; }
        public List<UserReportDTO> Users { get; set; }
    }
}
