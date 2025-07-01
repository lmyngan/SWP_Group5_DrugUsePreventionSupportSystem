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

        // POST: api/test/submit
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


        // GET: api/test/{testId}
        [HttpGet("{testId}")]
        public async Task<IActionResult> GetTestById(int testId)
        {
            var result = await _testService.GetTestByIdAsync(testId);
            if (result == null)
            {
                return NotFound(new { message = "Test not found." });
            }

            return Ok(result);
        }

        // GET: api/test/result/{resultId}
        [HttpGet("result/{resultId}")]
        public async Task<IActionResult> GetUserTestResult(int resultId)
        {
            var result = await _testService.GetTestResultDetailsAsync(resultId);
            if (result == null)
            {
                return NotFound(new { message = "Test result not found." });
            }

            return Ok(result);
        }

        // GET: api/test/{testId}/questions?resultId=1
        [HttpGet("{testId}/questions")]
        public async Task<IActionResult> GetTestQuestions(int testId, [FromQuery] int? resultId = null)
        {
            var result = await _testService.GetTestQuestionsWithDetailsAsync(testId, resultId);
            return Ok(result);
        }
    }
}
