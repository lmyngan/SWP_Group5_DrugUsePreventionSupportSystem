using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Event;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;

namespace DrugsPrevention_Data.Service.Implementations
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _repo;

        public EventService(IEventRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<EventDto>> GetAllEventsAsync()
        {
            var events = await _repo.GetAllEventsAsync();
            return events.Select(e => new EventDto
            {
                EventId = e.EventId,
                Name = e.Name,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
                Type = e.Type,
                CreatedBy = e.CreatedBy,
                CreatorAccountId = e.Creator.AccountId,
                CreatorAccountname = e.Creator.Accountname,
                CreatorFullName = e.Creator.FullName
            });
        }

        public async Task<EventDto> GetEventByIdAsync(int id)
        {
            var e = await _repo.GetEventByIdAsync(id);
            if (e == null) return null;

            return new EventDto
            {
                EventId = e.EventId,
                Name = e.Name,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
                Type = e.Type,
                CreatedBy = e.CreatedBy,
                CreatorAccountId = e.Creator.AccountId,
                CreatorAccountname = e.Creator.Accountname,
                CreatorFullName = e.Creator.FullName
            };
        }

        public async Task<EventDto> CreateEventAsync(CreateEventDto dto)
        {
            var ev = new Event
            {
                Name = dto.Name,
                Description = dto.Description,
                Date = dto.Date,
                Location = dto.Location,
                Type = dto.Type,
                CreatedBy = dto.CreatedBy
            };

            var created = await _repo.AddEventAsync(ev);
            return await GetEventByIdAsync(created.EventId);
        }

        public async Task<EventDto> UpdateEventAsync(UpdateEventDto dto)
        {
            var existing = await _repo.GetEventByIdAsync(dto.EventId);
            if (existing == null) return null;

            existing.Name = dto.Name;
            existing.Description = dto.Description;
            existing.Date = dto.Date;
            existing.Location = dto.Location;
            existing.Type = dto.Type;

            var updated = await _repo.UpdateEventAsync(existing);
            return await GetEventByIdAsync(updated.EventId);
        }

        public async Task<bool> DeleteEventAsync(int id)
        {
            return await _repo.DeleteEventAsync(id);
        }
        public async Task<IEnumerable<EventDto>> SearchEventsByNameAsync(string name)
        {
            var events = await _repo.SearchEventsByNameAsync(name);
            return events.Select(e => new EventDto
            {
                EventId = e.EventId,
                Name = e.Name,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
                Type = e.Type,
                CreatedBy = e.CreatedBy,
                CreatorAccountId = e.Creator.AccountId,
                CreatorAccountname = e.Creator.Accountname,
                CreatorFullName = e.Creator.FullName
            });
        }
    }
}
