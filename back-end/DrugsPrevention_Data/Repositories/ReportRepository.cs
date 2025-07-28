using DrugsPrevention_Data.DTO.Report;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
                    .CountAsync(a => a.Status == "Completed"),

                AverageBlogRating = Math.Round(
            await _context.Blogs
                .Where(b => b.Rate > 0)
                .AverageAsync(b => (double?)b.Rate) ?? 0,
                1
                )
            };
            return report;
        }
        public async Task<UserReportDTO> GetTopUserByEventParticipationAsync()
        {
            var topUserGroup = await _context.EventParticipations
                .GroupBy(e => e.AccountId)
                .Select(g => new
                {
                    AccountId = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(g => g.Count)
                .FirstOrDefaultAsync();

            if (topUserGroup == null)
                return null;

            var account = await _context.Accounts
                .Where(a => a.AccountId == topUserGroup.AccountId)
                .Select(a => new UserReportDTO
                {
                    AccountId = a.AccountId,
                    FullName = a.FullName,
                    Gender = a.Gender,
                    CreatedAt = a.CreatedAt,
                    ParticipationCount = topUserGroup.Count
                })
                .FirstOrDefaultAsync();

            return account;
        }


        public async Task<List<UserReportDTO>> GetUsersOfMostPopularEventAsync()
        {
            var topEvent = await _context.EventParticipations
                .GroupBy(e => e.EventId)
                .OrderByDescending(g => g.Count())
                .Select(g => new { EventId = g.Key, Count = g.Count() })
                .FirstOrDefaultAsync();

            if (topEvent == null) return new List<UserReportDTO>();

            var result = await _context.EventParticipations
                .Where(e => e.EventId == topEvent.EventId)
                .GroupBy(e => new { e.AccountId, e.Account.FullName })
                .Select(g => new UserReportDTO
                {
                    AccountId = g.Key.AccountId,
                    FullName = g.Key.FullName,
                    Gender = g.Select(x => x.Account.Gender).FirstOrDefault(),
                    CreatedAt = g.Select(x => x.Account.CreatedAt).FirstOrDefault(),
                    ParticipationCount = g.Count()
                })
                .ToListAsync();

            return result;
        }
        public async Task<PopularEventReportDTO> GetMostPopularEventWithUsersAsync()
        {
            var topEventGroup = await _context.EventParticipations
                .GroupBy(e => e.EventId)
                .OrderByDescending(g => g.Count())
                .Select(g => new {
                    EventId = g.Key,
                    Count = g.Count()
                })
                .FirstOrDefaultAsync();

            if (topEventGroup == null)
                return null;

            var eventInfo = await _context.Events
                .Where(e => e.EventId == topEventGroup.EventId)
                .Select(e => new { e.EventId, e.Name })
                .FirstOrDefaultAsync();

            var users = await _context.EventParticipations
                .Where(e => e.EventId == topEventGroup.EventId)
                .GroupBy(e => new { e.AccountId, e.Account.FullName })
                .Select(g => new UserReportDTO
                {
                    AccountId = g.Key.AccountId,
                    FullName = g.Key.FullName,
                    Gender = g.Select(x => x.Account.Gender).FirstOrDefault(),
                    CreatedAt = g.Select(x => x.Account.CreatedAt).FirstOrDefault(),
                    ParticipationCount = g.Count()
                })
                .ToListAsync();

            return new PopularEventReportDTO
            {
                EventId = eventInfo?.EventId ?? 0,
                EventName = eventInfo?.Name ?? "Unknown",
                TotalParticipants = topEventGroup.Count,
                Users = users
            };
        }

        public async Task<BlogRatingReportDTO> GetBlogRatingReportAsync()
        {
            var blogs = await _context.Blogs.ToListAsync();
            
            var report = new BlogRatingReportDTO
            {
                FiveStarCount = blogs.Count(b => b.Rate >= 4.5 && b.Rate <= 5.0),
                FourStarCount = blogs.Count(b => b.Rate >= 3.5 && b.Rate < 4.5),
                ThreeStarCount = blogs.Count(b => b.Rate >= 2.5 && b.Rate < 3.5),
                TwoStarCount = blogs.Count(b => b.Rate >= 1.5 && b.Rate < 2.5),
                OneStarCount = blogs.Count(b => b.Rate >= 0.5 && b.Rate < 1.5),
                ZeroStarCount = blogs.Count(b => b.Rate >= 0.0 && b.Rate < 0.5),
                TotalBlogs = blogs.Count,
                AverageRating = blogs.Count > 0 ? Math.Round(blogs.Average(b => b.Rate), 1) : 0
            };

            return report;
        }

    }
}
