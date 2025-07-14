using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Appointment;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Authorization;
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
        [AuthorizeByRole(4)]
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

        [AuthorizeByRole(3)]
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

        [AuthorizeByRole(1, 2, 3)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var results = await _service.GetAllAppointmentsAsync();
            return Ok(results);
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetAppointmentByIdAsync(id);
            if (result == null) return NotFound(new { message = "Không tìm thấy cuộc hẹn." });
            return Ok(result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AppointmentCreateDTO request)
        {
            var result = await _service.CreateAppointmentAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.AppointmentId }, result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AppointmentCreateDTO request)
        {
            var result = await _service.UpdateAppointmentAsync(id, request);
            if (result == null) return NotFound(new { message = "Không tìm thấy cuộc hẹn để cập nhật." });
            return Ok(result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAppointmentAsync(id);
            if (!deleted) return NotFound(new { message = "Không tìm thấy cuộc hẹn để xoá." });
            return NoContent();
        }

        [AuthorizeByRole(1, 2)]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromQuery] string status)
        {
            var result = await _service.UpdateAppointmentStatusAsync(id, status);
            if (result == null) return NotFound(new { message = "Không cập nhật được trạng thái." });

            return Ok(new
            {
                message = "Cập nhật trạng thái thành công",
                status = result.Status,
                url = $"{Request.Scheme}://{Request.Host}/api/Appointment/{result.AppointmentId}/status?status={result.Status}"
            });
        }
        [AuthorizeByRole(4)]
        [HttpGet("{appointmentId}/vnpay-url")]
        public async Task<IActionResult> CreateVNPayUrl(int appointmentId)
        {
            try
            {
                var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
                var url = await _service.CreateVNPayPaymentUrlAsync(appointmentId, ipAddress);
                return Ok(new { paymentUrl = url });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpGet("vnpay-callback")]
        public async Task<IActionResult> VNPayCallback()
        {
            try
            {
                var vnpayData = Request.Query.ToDictionary(k => k.Key, v => v.Value.ToString());
                bool success = await _service.HandleVNPayCallbackAsync(vnpayData);
                if (success)
                {
                    return Ok(new { message = "Thanh toán VNPay thành công!" });
                }
                else
                {
                    return BadRequest(new { message = "Thanh toán thất bại hoặc không hợp lệ." });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Lỗi xử lý callback: {ex.Message}" });
            }
        }

    }
}
