using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Certificate;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        private readonly ICertificateService _service;

        public CertificateController(ICertificateService service)
        {
            _service = service;
        }

        [AuthorizeByRole(1)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _service.GetByIdAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [AuthorizeByRole(1, 2)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCertificateDTO dto)
        {
            var result = await _service.CreateAsync(dto);
            return Ok(result);
        }

        [AuthorizeByRole(1, 2)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateCertificateDTO dto)
        {
            var success = await _service.UpdateAsync(id, dto);
            if (!success) return NotFound(new { message = "Không tìm thấy chứng nhận." });
            return NoContent();
        }

        [AuthorizeByRole(1)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound(new { message = "Không tìm thấy chứng nhận." });
            return NoContent();
        }
    }
}
