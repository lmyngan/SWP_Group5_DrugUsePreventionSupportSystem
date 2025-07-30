using DrugsPrevention_Data.DTO.Blog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogDto>> GetAllAsync();
        Task<BlogDto> GetByIdAsync(int id);
        Task AddAsync(CreateBlogDto dto);
        Task UpdateAsync(UpdateBlogDto dto);
        Task DeleteAsync(int id);
        Task RateBlogAsync(int blogId, int accountId, float newRating);
    }
}
