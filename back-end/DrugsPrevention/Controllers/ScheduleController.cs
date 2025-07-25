using DrugsPrevention_Data.DTO.Schedule;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/schedule")]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleService _service;

        public ScheduleController(IScheduleService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound(new { message = $"Không tìm thấy lịch với id = {id}" });

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BaseScheduleDTO dto)
        {
            if (dto.ConsultantId <= 0)
                return BadRequest(new { message = "Thiếu hoặc sai ConsultantId" });

            var success = await _service.CreateAsync(dto);
            if (!success)
                return BadRequest(new { message = "Consultant không tồn tại" });

            return Ok(new { message = "Tạo thành công" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BaseScheduleDTO dto)
        {
            if (dto.ScheduleId != id)
                return BadRequest(new { message = "ScheduleId trong route và body không khớp" });

            var success = await _service.UpdateAsync(dto);
            if (!success)
                return NotFound(new { message = $"Không tìm thấy schedule với id = {id}" });

            return Ok(new { message = "Cập nhật thành công" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
                return NotFound(new { message = $"Không tìm thấy schedule với id = {id}" });

            return Ok(new { message = "Xóa thành công" });
        }
    }
}
