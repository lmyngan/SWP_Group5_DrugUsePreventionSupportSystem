using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IEventParticipationRepository
    {
        Task<EventParticipation> AddParticipationAsync(EventParticipation participation);
        Task<IEnumerable<EventParticipation>> GetByAccountIdAsync(int accountId);
        Task<EventParticipation> GetByAccountAndEventAsync(int accountId, int eventId);
        Task SaveChangesAsync();
    }
}

