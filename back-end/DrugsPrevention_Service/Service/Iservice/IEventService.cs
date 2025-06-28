using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllAsync();
        Task<EventDto> GetByIdAsync(int id);
        Task<EventDto> GetWithDetailsAsync(int id);
        Task AddAsync(CreateEventDto dto);
        Task UpdateAsync(UpdateEventDto dto);
        Task DeleteAsync(int id);
    }
}
