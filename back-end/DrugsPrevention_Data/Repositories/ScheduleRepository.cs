using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public ScheduleRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Schedule>> GetAllAsync()
        {
            return await _context.Schedules
                .Include(s => s.Consultant)
                    .ThenInclude(c => c.Account)
                .ToListAsync();
        }

        public async Task<Schedule?> GetByIdAsync(int id)
        {
            return await _context.Schedules
                .Include(s => s.Consultant)
                    .ThenInclude(c => c.Account)
                .FirstOrDefaultAsync(s => s.ScheduleId == id);
        }

        public async Task AddAsync(Schedule schedule)
        {
            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Schedule schedule)
        {
            _context.Schedules.Update(schedule);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Schedule schedule)
        {
            _context.Schedules.Remove(schedule);
            await _context.SaveChangesAsync();
        }

        public async Task<Consultant?> GetConsultantByAccountNameAsync(string accountName)
        {
            return await _context.Consultants
                .Include(c => c.Account)
                .FirstOrDefaultAsync(c => c.Account.Accountname == accountName);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
