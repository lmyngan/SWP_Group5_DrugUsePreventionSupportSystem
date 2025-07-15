using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;

namespace DrugsPrevention_Data.Repositories
{
    public class ConsultantRepository : IConsultantRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public ConsultantRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<Consultant> GetConsultantByIdAsync(int consultantId)
        {
            return await _context.Consultants
                .Include(c => c.Account)
                .Include(c => c.Certificates)
                .FirstOrDefaultAsync(c => c.ConsultantId == consultantId);
        }
        public async Task<List<Consultant>> GetAllConsultantsAsync()
        {
            return await _context.Consultants
                .Include(c => c.Account)
                .Include(c => c.Certificates)
                .ToListAsync();
        }
        public async Task UpdateConsultantAsync(Consultant consultant)
        {
            _context.Consultants.Update(consultant);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
