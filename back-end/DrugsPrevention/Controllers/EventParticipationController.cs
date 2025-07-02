using DrugsPrevention_Data.DTO.EventParticipation;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventParticipationController : ControllerBase
    {
        private readonly IEventParticipationService _service;

        public EventParticipationController(IEventParticipationService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> AddParticipation([FromBody] CreateEventParticipationDTO dto)
        {
            var success = await _service.AddParticipationAsync(dto);
            if (!success)
                return BadRequest("Tham gia sự kiện thất bại.");

            return Ok("Tham gia sự kiện thành công.");
        }
    }
}
