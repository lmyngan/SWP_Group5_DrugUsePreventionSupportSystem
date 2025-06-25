using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Schedule;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IAppointmentRepository
    {
        Task<Appointment> CreateAppointmentAsync(Appointment appointment);
        Task<Schedule> GetScheduleByIdAsync(int scheduleId);
        Task<bool> IsSlotAvailable(int scheduleId, TimeSpan startTime, TimeSpan endTime);
    }
}
