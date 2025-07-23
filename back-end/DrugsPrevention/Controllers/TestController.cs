using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [AuthorizeByRole(4)]
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitTest([FromBody] TestResultCreateDTO submission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var resultId = await _testService.SubmitTestAsync(submission);
            return Ok(new { resultId });
        }

        
        [HttpGet("{testId}")]
        public async Task<IActionResult> GetTestById(int testId)
        {
            var result = await _testService.GetTestByIdAsync(testId);
            if (result == null)
            {
                return NotFound(new { message = "Không tìm thấy bài test." });
            }

            return Ok(result);
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("result/{resultId}")]
        public async Task<IActionResult> GetUserTestResult(int resultId)
        {
            var result = await _testService.GetTestResultDetailsAsync(resultId);
            if (result == null)
            {
                return NotFound(new { message = "Không tìm thấy kết quả." });
            }

            return Ok(result);
        }

        
        [HttpGet("{testId}/questions")]
        public async Task<IActionResult> GetTestQuestions(int testId, [FromQuery] int? resultId = null)
        {
            var result = await _testService.GetTestQuestionsWithDetailsAsync(testId, resultId);
            return Ok(result);
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("account/{accountId}/results")]
        public async Task<IActionResult> GetTestResultsByAccount(int accountId)
        {
            var results = await _testService.GetTestResultsByAccountIdAsync(accountId);
            return Ok(results);
        }
    }
}
