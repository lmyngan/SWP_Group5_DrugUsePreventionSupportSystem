using DrugsPrevention_Data.DTO.Report;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Implementations
{
    public class ReportRepository : IReportRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public ReportRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<ReportSummaryDTO> GetReportSummaryAsync()
        {
            var report = new ReportSummaryDTO
            {
                TotalConsultingRevenue = await _context.Appointments
                    .Where(a => a.Status == "Completed")
                    .SumAsync(a => (decimal?)a.Price) ?? 0,

                TotalEventFeedbackCount = await _context.EventParticipations
                    .CountAsync(e => !string.IsNullOrEmpty(e.Feedback)),

                TotalNewUsersThisMonth = await _context.Accounts
                    .CountAsync(a => a.CreatedAt.Month == DateTime.Now.Month &&
                                     a.CreatedAt.Year == DateTime.Now.Year),

                TotalAppointmentsCompleted = await _context.Appointments
                    .CountAsync(a => a.Status == "Completed")
            };

            return report;
        }
    }
}
