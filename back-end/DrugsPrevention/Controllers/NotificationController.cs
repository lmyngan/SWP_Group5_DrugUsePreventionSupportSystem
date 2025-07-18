using DrugsPrevention_Data.DTO.Notification;
using DrugsPrevention_Service.Service;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _service;

        public NotificationController(INotificationService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] NotificationCreateDTO dto)
        {
            try
            {
                var result = await _service.CreateNotificationAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetNotifications(int accountId)
        {
            try
            {
                var notifications = await _service.GetNotificationsByAccountIdAsync(accountId);
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPut("mark-as-read/{notificationId}")]
        public async Task<IActionResult> MarkAsRead(int notificationId)
        {
            var result = await _service.MarkAsReadAsync(notificationId);
            if (!result)
                return NotFound("Notification not found.");

            return Ok("Notification marked as read.");
        }
    }
}
