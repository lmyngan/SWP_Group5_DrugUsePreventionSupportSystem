using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Report
{
    public class ReportSummaryDTO
    {
        public decimal TotalConsultingRevenue { get; set; }
        public int TotalEventFeedbackCount { get; set; }
        public int TotalNewUsersThisMonth { get; set; }
        public int TotalAppointmentsCompleted { get; set; }

        public double AverageBlogRating { get; set; }
    }

}

