using DrugsPrevention_Data;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Event;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        public async Task<IEnumerable<EventDto>> GetAllAsync()
        {
            var events = await _eventRepository.GetEventsWithCreatorAsync(); // include Creator

            return events.Select(e => new EventDto
            {
                EventId = e.EventId,
                Name = e.Name,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
                Type = e.Type,
                CreatedBy = e.CreatedBy,
                CreatorAccountId = e.Creator?.AccountId ?? 0,
                CreatorAccountname = e.Creator?.Accountname,
                CreatorFullName = e.Creator?.FullName
            });
        }

        public async Task<EventDto> GetByIdAsync(int id)
        {
            var e = await _eventRepository.GetWithDetailsAsync(id);
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
                CreatorAccountId = e.Creator?.AccountId ?? 0,
                CreatorAccountname = e.Creator?.Accountname,
                CreatorFullName = e.Creator?.FullName
            };
        }

        public async Task<EventDto> GetWithDetailsAsync(int id)
        {
            var e = await _eventRepository.GetWithDetailsAsync(id);
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
                CreatorAccountId = e.Creator?.AccountId ?? 0,
                CreatorAccountname = e.Creator?.Accountname,
                CreatorFullName = e.Creator?.FullName
            };
        }

        public async Task AddAsync(CreateEventDto dto)
        {
            var entity = new Event
            {
                Name = dto.Name,
                Description = dto.Description,
                Date = dto.Date,
                Location = dto.Location,
                Type = dto.Type,
                CreatedBy = dto.CreatedBy
            };

            await _eventRepository.AddAsync(entity);
            await _eventRepository.SaveAsync();
        }

        public async Task UpdateAsync(UpdateEventDto dto)
        {
            var entity = await _eventRepository.GetByIdAsync(dto.EventId);
            if (entity == null) return;

            entity.Name = dto.Name;
            entity.Description = dto.Description;
            entity.Date = dto.Date;
            entity.Location = dto.Location;
            entity.Type = dto.Type;
            entity.CreatedBy = dto.CreatedBy;

            _eventRepository.Update(entity);
            await _eventRepository.SaveAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _eventRepository.GetByIdAsync(id);
            if (entity == null) return;

            _eventRepository.Delete(entity);
            await _eventRepository.SaveAsync();
        }
    }
}
