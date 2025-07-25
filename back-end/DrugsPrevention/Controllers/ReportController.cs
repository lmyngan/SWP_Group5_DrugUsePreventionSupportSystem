using DrugsPrevention_Service.Service.Iservice;
using DrugsPrevention_Service.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetReportSummary()
        {
            var summary = await _reportService.GetReportSummaryAsync();
            return Ok(summary);
        }
        [HttpGet("top-user-event-participation")]
        public async Task<IActionResult> GetTopUserByEventParticipation()
        {
            var result = await _reportService.GetTopUserByEventParticipationAsync();
            return Ok(result);
        }

        [HttpGet("most-popular-event-users")]
        public async Task<IActionResult> GetUsersOfMostPopularEvent()
        {
            var result = await _reportService.GetUsersOfMostPopularEventAsync();
            return Ok(result);
        }
        [HttpGet("most-popular-event-detail")]
        public async Task<IActionResult> GetMostPopularEventDetail()
        {
            var result = await _reportService.GetMostPopularEventWithUsersAsync();
            return Ok(result);
        }
    }
}
