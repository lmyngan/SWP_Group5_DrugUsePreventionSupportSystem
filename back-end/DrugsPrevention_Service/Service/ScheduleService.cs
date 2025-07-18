using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Schedule;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class ScheduleService : IScheduleService
    {
        private readonly IScheduleRepository _scheduleRepository;

        public ScheduleService(IScheduleRepository scheduleRepository)
        {
            _scheduleRepository = scheduleRepository;
        }

        public async Task<IEnumerable<BaseScheduleDTO>> GetAllAsync()
        {
            var schedules = await _scheduleRepository.GetAllAsync();
            return schedules.Select(s => new BaseScheduleDTO
            {
                ScheduleId = s.ScheduleId,
                AvailableDate = s.AvailableDate,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                Slot = s.Slot,
                ConsultantId = s.ConsultantId,
                AccountId = s.Consultant?.AccountId ?? 0
            });
        }

        public async Task<BaseScheduleDTO?> GetByIdAsync(int id)
        {
            var s = await _scheduleRepository.GetByIdAsync(id);
            if (s == null) return null;

            return new BaseScheduleDTO
            {
                ScheduleId = s.ScheduleId,
                AvailableDate = s.AvailableDate,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                Slot = s.Slot,
                ConsultantId = s.ConsultantId,
                AccountId = s.Consultant?.AccountId ?? 0
            };
        }

        public async Task<bool> CreateAsync(BaseScheduleDTO dto)
        {
            var consultant = await _scheduleRepository.GetConsultantByIdAsync(dto.ConsultantId);
            if (consultant == null) return false;

            var schedule = new Schedule
            {
                ConsultantId = dto.ConsultantId,
                AvailableDate = dto.AvailableDate,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Slot = dto.Slot
            };

            await _scheduleRepository.AddAsync(schedule);
            return true;
        }

        public async Task<bool> UpdateAsync(BaseScheduleDTO dto)
        {
            var schedule = await _scheduleRepository.GetByIdAsync(dto.ScheduleId);
            if (schedule == null) return false;

            schedule.AvailableDate = dto.AvailableDate;
            schedule.StartTime = dto.StartTime;
            schedule.EndTime = dto.EndTime;
            schedule.Slot = dto.Slot;

            await _scheduleRepository.UpdateAsync(schedule);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var schedule = await _scheduleRepository.GetByIdAsync(id);
            if (schedule == null) return false;

            await _scheduleRepository.DeleteAsync(schedule);
            return true;
        }
    }
}
