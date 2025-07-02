using DrugsPrevention_Data.DTO.Appointment;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _service;

        public AppointmentController(IAppointmentService service)
        {
            _service = service;
        }

        [HttpPost("book")]
        public async Task<IActionResult> BookAppointment([FromBody] AppointmentCreateDTO dto)
        {
            try
            {
                var result = await _service.BookAppointmentAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("consultant/{consultantId}/schedules")]
        public async Task<IActionResult> GetSchedules(int consultantId)
        {
            try
            {
                var result = await _service.GetSchedulesByConsultantIdAsync(consultantId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await _service.GetAllAppointmentsAsync();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetAppointmentByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AppointmentCreateDTO request)
        {
            var result = await _service.CreateAppointmentAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.AppointmentId }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AppointmentCreateDTO request)
        {
            var result = await _service.UpdateAppointmentAsync(id, request);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAppointmentAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] AppointmentStatusUpdateDTO request)
        {
            var result = await _service.UpdateAppointmentStatusAsync(id, request);
            if (result == null) return NotFound();
            return Ok(result);
        }
    }
}
