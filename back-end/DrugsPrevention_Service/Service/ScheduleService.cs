using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Schedule;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<IEnumerable<ScheduleDTO>> GetAllAsync()
        {
            var schedules = await _scheduleRepository.GetAllAsync();
            return schedules.Select(s => new ScheduleDTO
            {
                ScheduleId = s.ScheduleId,
                AvailableDate = s.AvailableDate,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                Slot = s.Slot,
                AccountName = s.Consultant?.Account?.Accountname
            });
        }

        public async Task<ScheduleDTO?> GetByIdAsync(int id)
        {
            var s = await _scheduleRepository.GetByIdAsync(id);
            if (s == null) return null;

            return new ScheduleDTO
            {
                ScheduleId = s.ScheduleId,
                AvailableDate = s.AvailableDate,
                StartTime = s.StartTime,
                EndTime = s.EndTime,
                Slot = s.Slot,
                AccountName = s.Consultant?.Account?.Accountname
            };
        }

        public async Task<bool> CreateAsync(ScheduleDTO dto)
        {
            var consultant = await _scheduleRepository.GetConsultantByAccountNameAsync(dto.AccountName);
            if (consultant == null) return false;

            var schedule = new Schedule
            {
                ConsultantId = consultant.ConsultantId,
                AvailableDate = dto.AvailableDate,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Slot = dto.Slot
            };

            await _scheduleRepository.AddAsync(schedule);
            return true;
        }

        public async Task<bool> UpdateAsync(ScheduleDTO dto)
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
