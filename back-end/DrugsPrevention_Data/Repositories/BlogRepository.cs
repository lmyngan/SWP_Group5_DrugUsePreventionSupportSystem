using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public BlogRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Blogs>> GetAllAsync()
        {
            return await _context.Blogs.ToListAsync();
        }

        public async Task<IEnumerable<Blogs>> GetAllWithAuthorAsync()
        {
            return await _context.Blogs.Include(b => b.Account).ToListAsync();
        }

        public async Task<Blogs> GetByIdAsync(int id)
        {
            return await _context.Blogs.FindAsync(id);
        }

        public async Task<Blogs> GetByIdWithAuthorAsync(int id)
        {
            return await _context.Blogs.Include(b => b.Account).FirstOrDefaultAsync(b => b.BlogId == id);
        }

        public async Task AddAsync(Blogs blog)
        {
            await _context.Blogs.AddAsync(blog);
        }

        public void Update(Blogs blog)
        {
            _context.Blogs.Update(blog);
        }

        public void Delete(Blogs blog)
        {
            _context.Blogs.Remove(blog);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

}
