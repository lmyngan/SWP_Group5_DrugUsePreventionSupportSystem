using DrugsPrevention_Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllAsync();
        Task<Event> GetByIdAsync(int id);
        Task<Event> GetWithDetailsAsync(int id);
        Task<IEnumerable<Event>> GetEventsWithCreatorAsync();
        Task AddAsync(Event e);
        void Update(Event e);
        void Delete(Event e);
        Task SaveAsync();
    }

}
