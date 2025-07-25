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
        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet]
        public async Task<IActionResult> GetAllConsultants()
        {
            try
            {
                var result = await _consultantService.GetAllConsultantsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [AuthorizeByRole(3)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateConsultantProfile(int id, [FromBody] ConsultantUpdateDTO dto)
        {
            try
            {
                var result = await _consultantService.UpdateConsultantProfileAsync(id, dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

    }
}
