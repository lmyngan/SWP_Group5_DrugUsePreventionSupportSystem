using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Appointment;
using DrugsPrevention_Data.DTO.Schedule;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IAppointmentService
    {
        Task<AppointmentResponseDTO> BookAppointmentAsync(AppointmentCreateDTO dto);
        Task<List<ScheduleDTO>> GetSchedulesByConsultantIdAsync(int consultantId);
    }
}
