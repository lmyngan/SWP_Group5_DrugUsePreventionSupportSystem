using DrugsPrevention_Data.DTO.Event;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var events = await _eventService.GetAllAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var evt = await _eventService.GetByIdAsync(id);
            if (evt == null)
                return NotFound();

            return Ok(evt);
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetWithDetails(int id)
        {
            var evt = await _eventService.GetWithDetailsAsync(id);
            if (evt == null)
                return NotFound();

            return Ok(evt);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _eventService.AddAsync(dto);
            return Ok(new { message = "Event created successfully." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEventDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != dto.EventId)
                return BadRequest("Event ID mismatch.");

            var existing = await _eventService.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _eventService.UpdateAsync(dto);
            return Ok(new { message = "Event updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _eventService.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            await _eventService.DeleteAsync(id);
            return Ok(new { message = "Event deleted successfully." });
        }
    }
}
