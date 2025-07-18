using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Implementations
{
    public class EventParticipationRepository : IEventParticipationRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public EventParticipationRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<EventParticipation> AddParticipationAsync(EventParticipation participation)
        {
            _context.EventParticipations.Add(participation);
            await _context.SaveChangesAsync();
            return participation;
        }

        public async Task<IEnumerable<EventParticipation>> GetByAccountIdAsync(int accountId)
        {
            return await _context.EventParticipations
                .Where(ep => ep.AccountId == accountId)
                .ToListAsync();
        }

        public async Task<EventParticipation> GetByAccountAndEventAsync(int accountId, int eventId)
        {
            return await _context.EventParticipations
                .FirstOrDefaultAsync(ep => ep.AccountId == accountId && ep.EventId == eventId);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

