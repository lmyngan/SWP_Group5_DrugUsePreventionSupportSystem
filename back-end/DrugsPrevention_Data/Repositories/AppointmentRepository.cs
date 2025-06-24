using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
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
    }
}