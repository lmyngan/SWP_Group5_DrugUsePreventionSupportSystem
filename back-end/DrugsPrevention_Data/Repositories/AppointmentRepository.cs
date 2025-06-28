using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Schedule;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;

namespace DrugsPrevention_Data.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public AppointmentRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<Appointment> CreateAppointmentAsync(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return appointment;
        }

        public async Task<Schedule> GetScheduleByIdAsync(int scheduleId)
        {
            return await _context.Schedules.FindAsync(scheduleId);
        }

        public async Task<bool> IsSlotAvailable(int scheduleId, TimeSpan startTime, TimeSpan endTime)
        {
            var schedule = await _context.Schedules.FindAsync(scheduleId);
            if (schedule == null) return false;

            int count = await _context.Appointments.CountAsync(a =>
                a.ScheduleId == scheduleId &&
                a.StartTime == startTime && a.EndTime == endTime);

            return count == 0;
        }
        public async Task<List<Appointment>> GetAllAsync()
        {
            return await _context.Appointments
                .Include(a => a.Consultant)
                .Include(a => a.Schedule)
                .Include(a => a.Account)
                .ToListAsync();
        }

        public async Task<Appointment> GetByIdAsync(int id)
        {
            return await _context.Appointments
                .Include(a => a.Consultant)
                .Include(a => a.Schedule)
                .Include(a => a.Account)
                .FirstOrDefaultAsync(a => a.AppointmentId == id);
        }

        public async Task AddAsync(Appointment appointment)
        {
            await _context.Appointments.AddAsync(appointment);
        }

        public async Task UpdateAsync(Appointment appointment)
        {
            _context.Appointments.Update(appointment);
        }

        public async Task DeleteAsync(Appointment appointment)
        {
            _context.Appointments.Remove(appointment);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
