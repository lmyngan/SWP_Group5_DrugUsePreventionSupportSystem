using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.EventParticipation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IEventParticipationService
    {
        Task<bool> AddParticipationAsync(CreateEventParticipationDTO dto);
        Task<IEnumerable<EventParticipation>> GetByAccountIdAsync(int accountId);
        Task<bool> UpdateParticipationAsync(UpdateEventParticipationDTO dto);
    }
}
