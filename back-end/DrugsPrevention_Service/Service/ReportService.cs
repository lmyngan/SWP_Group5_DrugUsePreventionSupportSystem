using DrugsPrevention_Data.DTO.Report;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Services
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
    }
}
