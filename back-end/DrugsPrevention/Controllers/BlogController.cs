using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Blog;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var blogs = await _blogService.GetAllAsync();
            return Ok(blogs);
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var blog = await _blogService.GetByIdAsync(id);
            if (blog == null) return NotFound();
            return Ok(blog);
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDetails(int id)
        {
            var blog = await _blogService.GetByIdAsync(id);
            if (blog == null)
                return NotFound();

            return Ok(blog);
        }

        [AuthorizeByRole(1, 2)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBlogDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _blogService.AddAsync(dto);
            return Ok(new { message = "Thêm blog thành công." });
        }

        [AuthorizeByRole(1, 2)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateBlogDto dto)
        {
            if (id != dto.BlogId) return BadRequest("ID không trùng khớp.");
            await _blogService.UpdateAsync(dto);
            return Ok(new { message = "Cập nhật blog thành công." });
        }

        [AuthorizeByRole(1, 2)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _blogService.DeleteAsync(id);
            return Ok(new { message = "Xoá blog thành công." });
        }
    }
}
