using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Report;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IReportRepository
    {
        Task<ReportSummaryDTO> GetReportSummaryAsync();
        Task<UserReportDTO> GetTopUserByEventParticipationAsync();
        Task<List<UserReportDTO>> GetUsersOfMostPopularEventAsync();
        Task<PopularEventReportDTO> GetMostPopularEventWithUsersAsync();
    }
}

