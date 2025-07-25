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
        Task<IEnumerable<EventDto>> GetAllEventsAsync();
        Task<EventDto> GetEventByIdAsync(int id);
        Task<EventDto> CreateEventAsync(CreateEventDto dto);
        Task<EventDto> UpdateEventAsync(UpdateEventDto dto);
        Task<bool> DeleteEventAsync(int id);
        Task<IEnumerable<EventDto>> SearchEventsByNameAsync(string name);
    }
}
