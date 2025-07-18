﻿using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Event;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _eventService.GetAllEventsAsync();
            return Ok(result);
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var result = await _eventService.GetEventByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var result = await _eventService.CreateEventAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = result.EventId }, result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEventDto dto)
        {
            if (id != dto.EventId) return BadRequest("ID không trùng khớp");
            var result = await _eventService.UpdateEventAsync(dto);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [AuthorizeByRole(1)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _eventService.DeleteEventAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
