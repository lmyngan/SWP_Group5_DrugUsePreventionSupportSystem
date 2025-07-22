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
                    .CountAsync(a => a.CreatedAt.Month == DateTime.Now.Month && a.CreatedAt.Year == DateTime.Now.Year),

                TotalAppointmentsCompleted = await _context.Appointments
                    .CountAsync(a => a.Status == "Completed"),

                AverageBlogRating = await _context.Blogs
                    .Where(b => b.Rate > 0)
                    .AverageAsync(b => (double?)b.Rate) ?? 0
            };

            return report;
        }
        public async Task<UserReportDTO> GetTopUserByEventParticipationAsync()
        {
            return await _context.EventParticipations
                .GroupBy(e => e.AccountId)
                .OrderByDescending(g => g.Count())
                .Select(g => new UserReportDTO
                {
                    AccountId = g.Key,
                    FullName = g.First().Account.FullName,
                    ParticipationCount = g.Count()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<UserReportDTO>> GetUsersOfMostPopularEventAsync()
        {
            var topEventId = await _context.EventParticipations
                .GroupBy(e => e.EventId)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefaultAsync();

            return await _context.EventParticipations
                .Where(e => e.EventId == topEventId)
                .Select(e => new UserReportDTO
                {
                    AccountId = e.AccountId,
                    FullName = e.Account.FullName,
                    ParticipationCount = _context.EventParticipations.Count(x => x.AccountId == e.AccountId)
                })
                .Distinct()
                .ToListAsync();
        }

    }
}
