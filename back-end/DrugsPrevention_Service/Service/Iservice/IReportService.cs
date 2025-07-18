using DrugsPrevention_Data.DTO.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IReportService
    {
        Task<ReportSummaryDTO> GetReportSummaryAsync();
    }
}
