using DrugsPrevention_Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IBlogRepository
    {
        Task<IEnumerable<Blogs>> GetAllAsync();
        Task<Blogs> GetByIdAsync(int id);
        Task AddAsync(Blogs blog);
        void Update(Blogs blog);
        void Delete(Blogs blog);
        Task SaveAsync();
        Task<IEnumerable<Blogs>> GetAllWithAuthorAsync();
        Task<Blogs> GetByIdWithAuthorAsync(int id);
    }
}
