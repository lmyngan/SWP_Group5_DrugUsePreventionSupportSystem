using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.EventParticipation;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventParticipationController : ControllerBase
    {
        private readonly IEventParticipationService _service;

        public EventParticipationController(IEventParticipationService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventParticipationDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _service.AddParticipationAsync(dto);
            return Ok(new { message = "Đăng ký tham gia sự kiện thành công." });
        }

        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetByAccount(int accountId)
        {
            var result = await _service.GetByAccountIdAsync(accountId);
            return Ok(result);
        }

        [HttpPut("{accountId}")]
        public async Task<IActionResult> Update([FromBody] UpdateEventParticipationDTO dto)
        {
            var updated = await _service.UpdateParticipationAsync(dto);
            if (!updated) return NotFound(new { message = "Không tìm thấy thông tin để cập nhật." });

            return Ok(new { message = "Cập nhật trạng thái và phản hồi thành công." });
        }
    }
}
