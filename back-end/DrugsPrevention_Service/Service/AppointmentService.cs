using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Appointment;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Data;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.EntityFrameworkCore;
using DrugsPrevention_Data.DTO.Schedule;
using ServiceStack;

namespace DrugsPrevention_Service.Service
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _repo;
        private readonly DrugsPrevention_DBContext _context;

        public AppointmentService(IAppointmentRepository repo, DrugsPrevention_DBContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<AppointmentResponseDTO> BookAppointmentAsync(AppointmentCreateDTO dto)
        {
            var schedule = await _repo.GetScheduleByIdAsync(dto.ScheduleId);
            if (schedule == null) throw new Exception("Schedule not found");

            var slotDuration = (schedule.EndTime - schedule.StartTime).TotalMinutes / schedule.Slot;
            TimeSpan bookedStartTime = schedule.StartTime;

            // Find next available time slot
            for (int i = 0; i < schedule.Slot; i++)
            {
                TimeSpan bookedEndTime = bookedStartTime.Add(TimeSpan.FromMinutes(slotDuration));
                if (await _repo.IsSlotAvailable(schedule.ScheduleId, bookedStartTime, bookedEndTime))
                {
                    var consultant = await _context.Consultants
                        .Include(c => c.Account)
                        .FirstOrDefaultAsync(c => c.ConsultantId == schedule.ConsultantId);

                    if (consultant == null || consultant.Account == null)
                        throw new Exception("Consultant or related Account not found");

                    var appointment = new Appointment
                    {
                        AccountId = dto.AccountId,
                        ConsultantId = consultant.ConsultantId,
                        ScheduleId = schedule.ScheduleId,
                        Price = consultant.Price,
                        StartTime = bookedStartTime,
                        EndTime = bookedEndTime,
                        Status = "pending",
                        Notes = dto.Notes,
                        CreatedAt = DateTime.UtcNow
                    };

                    var result = await _repo.CreateAppointmentAsync(appointment);

                    return new AppointmentResponseDTO
                    {
                        AppointmentId = result.AppointmentId,
                        ConsultantName = consultant.Account.FullName,
                        Date = schedule.AvailableDate,
                        StartTime = result.StartTime,
                        EndTime = result.EndTime,
                        Price = (float)result.Price,
                        Status = result.Status,
                        Notes = result.Notes
                    };
                }
                bookedStartTime = bookedStartTime.Add(TimeSpan.FromMinutes(slotDuration));
            }

            throw new Exception("No available time slot");
        }
        public async Task<List<ScheduleDTO>> GetSchedulesByConsultantIdAsync(int consultantId)
        {
            var schedules = await _context.Schedules
                .Where(s => s.ConsultantId == consultantId)
                .Select(s => new ScheduleDTO
                {
                    AccountName = s.Appointments.FirstOrDefault() != null ? s.Appointments.First().Account.Accountname : null,
                    ScheduleId = s.ScheduleId,
                    AvailableDate = s.AvailableDate,
                    StartTime = s.StartTime,
                    EndTime = s.EndTime,
                    Status = s.Appointments.FirstOrDefault() != null ? s.Appointments.First().Status : null,
                    Slot = s.Slot
                })
                .ToListAsync();

            return schedules;
        }
        public async Task<List<AppointmentResponseDTO>> GetAllAppointmentsAsync()
        {
            var appointments = await _repo.GetAllAsync();
            return appointments.Select(a => new AppointmentResponseDTO
            {
                AppointmentId = a.AppointmentId,
                ConsultantName = a.Consultant?.Account?.FullName,
                Date = a.Schedule?.AvailableDate ?? DateTime.MinValue,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Price = (float)a.Price,
                Status = a.Status,
                Notes = a.Notes
            }).ToList();
        }

        public async Task<AppointmentResponseDTO> GetAppointmentByIdAsync(int id)
        {
            var a = await _repo.GetByIdAsync(id);
            if (a == null) return null;

            return new AppointmentResponseDTO
            {
                AppointmentId = a.AppointmentId,
                ConsultantId = a.ConsultantId,
                ScheduleId = a.ScheduleId,
                ConsultantName = a.Consultant?.Account?.FullName,
                AccountName = a.Account?.Accountname,
                Date = a.Schedule?.AvailableDate ?? DateTime.MinValue,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Price = (float)a.Price,
                Status = a.Status,
                Notes = a.Notes
            };
        }


        public async Task<AppointmentResponseDTO> CreateAppointmentAsync(AppointmentCreateDTO request)
        {
            var appointment = new Appointment
            {
                AccountId = request.AccountId,
                ConsultantId = request.ConsultantId,
                ScheduleId = request.ScheduleId,
                Price = request.Price,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Status = request.Status,
                Notes = request.Notes,
                CreatedAt = request.CreatedAt
            };

            await _repo.AddAsync(appointment);
            await _repo.SaveChangesAsync();

            return await GetAppointmentByIdAsync(appointment.AppointmentId);
        }

        public async Task<AppointmentResponseDTO> UpdateAppointmentAsync(int id, AppointmentCreateDTO request)
        {
            var appointment = await _repo.GetByIdAsync(id);
            if (appointment == null) return null;

            appointment.ConsultantId = request.ConsultantId;
            appointment.ScheduleId = request.ScheduleId;
            appointment.Price = request.Price;
            appointment.StartTime = request.StartTime;
            appointment.EndTime = request.EndTime;
            appointment.Status = request.Status;
            appointment.Notes = request.Notes;

            await _repo.UpdateAsync(appointment);
            await _repo.SaveChangesAsync();

            return await GetAppointmentByIdAsync(appointment.AppointmentId);
        }

        public async Task<bool> DeleteAppointmentAsync(int id)
        {
            var appointment = await _repo.GetByIdAsync(id);
            if (appointment == null) return false;

            await _repo.DeleteAsync(appointment);
            await _repo.SaveChangesAsync();
            return true;
        }
        public async Task<AppointmentResponseDTO> UpdateAppointmentStatusAsync(int id, string status)
        {
            var appointment = await _repo.GetByIdAsync(id);
            if (appointment == null) return null;

            appointment.Status = status;
            await _repo.UpdateAsync(appointment);
            await _repo.SaveChangesAsync();

            return await GetAppointmentByIdAsync(appointment.AppointmentId);
        }
    }
}
