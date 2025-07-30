using DrugsPrevention_Service.Service.Iservice;
using DrugsPrevention_Service.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DrugsPrevention_API.Attributes;

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

        [AuthorizeByRole(1, 2)]
        [HttpGet("summary")]
        public async Task<IActionResult> GetReportSummary()
        {
            var summary = await _reportService.GetReportSummaryAsync();
            return Ok(summary);
        }
        [AuthorizeByRole(1, 2)]
        [HttpGet("top-user-event-participation")]
        public async Task<IActionResult> GetTopUserByEventParticipation()
        {
            var result = await _reportService.GetTopUserByEventParticipationAsync();
            return Ok(result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpGet("most-popular-event-users")]
        public async Task<IActionResult> GetUsersOfMostPopularEvent()
        {
            var result = await _reportService.GetUsersOfMostPopularEventAsync();
            return Ok(result);
        }
        [AuthorizeByRole(1, 2)]
        [HttpGet("most-popular-event-detail")]
        public async Task<IActionResult> GetMostPopularEventDetail()
        {
            var result = await _reportService.GetMostPopularEventWithUsersAsync();
            return Ok(result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpGet("blog-rating")]
        public async Task<IActionResult> GetBlogRatingReport()
        {
            var result = await _reportService.GetBlogRatingReportAsync();
            return Ok(result);
        }
    }
}
