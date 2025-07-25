using DrugsPrevention_Data.DTO.Report;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        public async Task<ReportSummaryDTO> GetReportSummaryAsync()
        {
            return await _reportRepository.GetReportSummaryAsync();
        }
        public async Task<UserReportDTO> GetTopUserByEventParticipationAsync()
        {
            return await _reportRepository.GetTopUserByEventParticipationAsync();
        }

        public async Task<List<UserReportDTO>> GetUsersOfMostPopularEventAsync()
        {
            return await _reportRepository.GetUsersOfMostPopularEventAsync();
        }
        public async Task<PopularEventReportDTO> GetMostPopularEventWithUsersAsync()
        {
            return await _reportRepository.GetMostPopularEventWithUsersAsync();
        }
    }
}
