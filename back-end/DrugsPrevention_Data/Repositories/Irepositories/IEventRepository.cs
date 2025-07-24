using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int id);
        Task<Event> AddEventAsync(Event ev);
        Task<Event> UpdateEventAsync(Event ev);
        Task<bool> DeleteEventAsync(int id);
        Task<IEnumerable<Event>> SearchEventsByNameAsync(string name);
    }
}
