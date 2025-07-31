using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.EventParticipation;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class EventParticipationService : IEventParticipationService
    {
        private readonly IEventParticipationRepository _repo;

        public EventParticipationService(IEventParticipationRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> AddParticipationAsync(CreateEventParticipationDTO dto)
        {
            var existing = await _repo.GetByAccountAndEventAsync(dto.AccountId, dto.EventId);
            if (existing != null)
                throw new Exception("Bạn đã tham gia sự kiện này rồi.");

            var participation = new EventParticipation
            {
                AccountId = dto.AccountId,
                EventId = dto.EventId,
                Status = dto.Status,
                Feedback = dto.Feedback
            };

            await _repo.AddParticipationAsync(participation);
            return true;
        }

        public async Task<IEnumerable<EventParticipation>> GetByAccountIdAsync(int accountId)
        {
            return await _repo.GetByAccountIdAsync(accountId);
        }

        public async Task<bool> UpdateParticipationAsync(UpdateEventParticipationDTO dto)
        {
            var participation = await _repo.GetByAccountAndEventAsync(dto.AccountId, dto.EventId);
            if (participation == null) return false;

            participation.Status = dto.Status;
            participation.Feedback = dto.Feedback;

            await _repo.SaveChangesAsync();
            return true;
        }
    }
}
