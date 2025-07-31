using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Blog;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

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
        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpPost("rate")]
        public async Task<IActionResult> RateBlog([FromBody] RateBlogDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var accountIdClaim = User.FindFirst("id");
                if (accountIdClaim == null)
                {
                    return Unauthorized(new { message = "Không thể xác định người dùng." });
                }

                int accountId = int.Parse(accountIdClaim.Value);

                await _blogService.RateBlogAsync(dto.BlogId, accountId, dto.Rating);
                return Ok(new { message = "Đánh giá blog thành công!" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("{id}/rating-stats")]
        public async Task<IActionResult> GetBlogRatingStats(int id)
        {
            try
            {
                var blog = await _blogService.GetByIdAsync(id);
                if (blog == null)
                {
                    return NotFound(new { message = "Blog không tồn tại" });
                }

                var stats = new
                {
                    BlogId = blog.BlogId,
                    Title = blog.Title,
                    CurrentRating = blog.Rate,
                    RatingCount = blog.RatingCount,
                    AverageRating = blog.RatingCount > 0 ? blog.Rate : 0
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
