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
        Task<IEnumerable<ScheduleDTO>> GetSchedulesByConsultantIdAsync(int consultantId);
        Task<List<AppointmentResponseDTO>> GetAllAppointmentsAsync();
        Task<AppointmentResponseDTO> GetAppointmentByIdAsync(int id);
        Task<AppointmentResponseDTO> CreateAppointmentAsync(AppointmentCreateDTO request);
        Task<AppointmentResponseDTO> UpdateAppointmentAsync(int id, AppointmentCreateDTO request);
        Task<AppointmentResponseDTO> UpdateAppointmentStatusByScheduleIdAsync(int scheduleId, string status);
        Task<bool> DeleteAppointmentAsync(int id);
        //Task<string> CreateVNPayPaymentUrlAsync(int appointmentId, string ipAddress);
        //Task<bool> HandleVNPayCallbackAsync(Dictionary<string, string> vnpayData);
    }
}
