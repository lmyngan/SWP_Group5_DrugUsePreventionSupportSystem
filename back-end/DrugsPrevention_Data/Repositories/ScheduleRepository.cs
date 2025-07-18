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
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly DrugsPrevention_DBContext _context;
        public ScheduleRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Schedule>> GetAllAsync()
            => await _context.Schedules.Include(s => s.Consultant).ToListAsync();

        public async Task<Schedule?> GetByIdAsync(int id)
            => await _context.Schedules.Include(s => s.Consultant)
                                       .FirstOrDefaultAsync(s => s.ScheduleId == id);

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
            => await _context.Consultants.FirstOrDefaultAsync(c => c.Account.Accountname == accountName);
    }
}
