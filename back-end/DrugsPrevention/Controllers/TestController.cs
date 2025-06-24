using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> SubmitTest([FromBody] TestSubmissionDTO submission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _testService.SubmitTestAsync(submission);

            if (result == null)
            {
                return StatusCode(500, "An error occurred while processing the test.");
            }

            return Ok(result);
        }

        [HttpGet("{testId}")]
        public async Task<IActionResult> GetTestById(int testId)
        {
            var result = await _testService.GetTestByIdAsync(testId);
            if (result == null) return NotFound(new { message = "Test not found" });

            return Ok(result);
        }
    }
}
