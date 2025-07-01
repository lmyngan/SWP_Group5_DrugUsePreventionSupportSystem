using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;

namespace DrugsPrevention_Data.Repositories.Implementations
{
    public class EventRepository : IEventRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public EventRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await _context.Events.Include(e => e.Creator).ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            return await _context.Events.Include(e => e.Creator).FirstOrDefaultAsync(e => e.EventId == id);
        }

        public async Task<Event> AddEventAsync(Event ev)
        {
            _context.Events.Add(ev);
            await _context.SaveChangesAsync();
            return ev;
        }

        public async Task<Event> UpdateEventAsync(Event ev)
        {
            _context.Events.Update(ev);
            await _context.SaveChangesAsync();
            return ev;
        }

        public async Task<bool> DeleteEventAsync(int id)
        {
            var ev = await _context.Events.FindAsync(id);
            if (ev == null) return false;

            _context.Events.Remove(ev);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
