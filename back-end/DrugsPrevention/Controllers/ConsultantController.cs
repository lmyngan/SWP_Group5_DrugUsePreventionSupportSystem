using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Consultant;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultantController : ControllerBase
    {
        private readonly IConsultantService _consultantService;

        public ConsultantController(IConsultantService consultantService)
        {
            _consultantService = consultantService;
        }

        [AuthorizeByRole(1, 2, 3)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConsultantById(int id)
        {
            try
            {
                var result = await _consultantService.GetConsultantByIdAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
