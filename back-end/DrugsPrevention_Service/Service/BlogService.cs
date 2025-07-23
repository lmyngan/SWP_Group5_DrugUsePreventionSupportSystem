using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Blog;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;

        public BlogService(IBlogRepository blogRepository)
        {
            _blogRepository = blogRepository;
        }

        public async Task<IEnumerable<BlogDto>> GetAllAsync()
        {
            var blogs = await _blogRepository.GetAllWithAuthorAsync();

            return blogs.Select(b => new BlogDto
            {
                BlogId = b.BlogId,
                AuthorId = b.AuthorId,
                Categories = b.Categories,
                Title = b.Title,
                Content = b.Content,
                Rate = (float)b.Rate,
                CreatedAt = b.CreatedAt,
                AuthorAccountname = b.Account?.Accountname,
                AuthorFullName = b.Account?.FullName
            });
        }

        public async Task<BlogDto> GetByIdAsync(int id)
        {
            var b = await _blogRepository.GetByIdWithAuthorAsync(id);
            if (b == null) return null;

            return new BlogDto
            {
                BlogId = b.BlogId,
                AuthorId = b.AuthorId,
                Categories = b.Categories,
                Title = b.Title,
                Content = b.Content,
                Rate = (float)b.Rate,
                CreatedAt = b.CreatedAt,
                AuthorAccountname = b.Account?.Accountname,
                AuthorFullName = b.Account?.FullName
            };
        }

        public async Task AddAsync(CreateBlogDto dto)
        {
            var blog = new Blogs
            {
                AuthorId = dto.AuthorId,
                Categories = dto.Categories,
                Title = dto.Title,
                Content = dto.Content,
                Rate = dto.Rate,
                CreatedAt = DateTime.UtcNow
            };

            await _blogRepository.AddAsync(blog);
            await _blogRepository.SaveAsync();
        }

        public async Task UpdateAsync(UpdateBlogDto dto)
        {
            var blog = await _blogRepository.GetByIdAsync(dto.BlogId);
            if (blog == null) return;

            blog.AuthorId = dto.AuthorId;
            blog.Categories = dto.Categories;
            blog.Title = dto.Title;
            blog.Content = dto.Content;
            blog.Rate = dto.Rate;

            _blogRepository.Update(blog);
            await _blogRepository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            if (blog == null) return;

            _blogRepository.Delete(blog);
            await _blogRepository.SaveAsync();
        }
        public async Task RateBlogAsync(int blogId, float newRating)
        {
            var blog = await _blogRepository.GetByIdAsync(blogId);
            if (blog == null) return;

            blog.Rate = ((float)blog.Rate * blog.RatingCount + newRating) / (blog.RatingCount + 1);
            blog.RatingCount++;

            _blogRepository.Update(blog);
            await _blogRepository.SaveAsync();
        }
    }
}
