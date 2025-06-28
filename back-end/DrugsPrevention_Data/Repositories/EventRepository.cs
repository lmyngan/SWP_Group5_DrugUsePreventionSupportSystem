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
    public class EventRepository : IEventRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public EventRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllAsync()
        {
            return await _context.Events
                .Include(e => e.Creator)
                .ToListAsync();
        }

        public async Task<Event> GetByIdAsync(int id)
        {
            return await _context.Events.FindAsync(id);
        }

        public async Task<Event> GetWithDetailsAsync(int id)
        {
            return await _context.Events
                .Include(e => e.Creator)
                .Include(e => e.Participations)
                .FirstOrDefaultAsync(e => e.EventId == id);
        }

        public async Task<IEnumerable<Event>> GetEventsWithCreatorAsync()
        {
            return await _context.Events.Include(e => e.Creator).ToListAsync();
        }

        public async Task AddAsync(Event e)
        {
            await _context.Events.AddAsync(e);
        }

        public void Update(Event e)
        {
            _context.Events.Update(e);
        }

        public void Delete(Event e)
        {
            _context.Events.Remove(e);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }

}
