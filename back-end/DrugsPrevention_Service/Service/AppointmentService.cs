using DrugsPrevention_Data;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Appointment;
using DrugsPrevention_Data.DTO.Schedule;
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
            if (schedule == null)
                throw new Exception("Schedule not found");

            var today = DateTime.UtcNow.Date;
            if (schedule.AvailableDate.Date < today)
                throw new Exception("Không thể đặt lịch vào ngày trong quá khứ.");

            // ktra StartTime < EndTime
            if (dto.StartTime >= dto.EndTime)
                throw new Exception("StartTime phải nhỏ hơn EndTime.");

            // ktra StartTime và EndTime nằm trong khoảng thời gian Schedule cho phép
            if (dto.StartTime < schedule.StartTime || dto.EndTime > schedule.EndTime)
                throw new Exception("Thời gian đặt lịch không nằm trong khung giờ cho phép của Schedule.");

            // ktra xem có trùng cuộc hẹn nào không
            var existingAppointments = await _context.Appointments
                .Where(a => a.ScheduleId == schedule.ScheduleId)
                .ToListAsync();

            bool isOverlap = existingAppointments.Any(a =>
                a.StartTime < dto.EndTime && a.EndTime > dto.StartTime);

            if (isOverlap)
                throw new Exception("Khoảng thời gian đã được đặt trước.");

            // lấy consultant
            var consultant = await _context.Consultants
                .Include(c => c.Account)
                .FirstOrDefaultAsync(c => c.ConsultantId == schedule.ConsultantId);

            if (consultant == null || consultant.Account == null)
                throw new Exception("Consultant hoặc tài khoản không tồn tại.");

            // tạo cuộc hẹn mới
            var appointment = new Appointment
            {
                AccountId = dto.AccountId,
                ConsultantId = consultant.ConsultantId,
                ScheduleId = schedule.ScheduleId,
                Price = consultant.Price,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
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



        public async Task<IEnumerable<ScheduleDTO>> GetSchedulesByConsultantIdAsync(int consultantId)
        {
            var schedules = await _context.Schedules
                .Include(s => s.Appointments)
                    .ThenInclude(a => a.Account)
                .Where(s => s.ConsultantId == consultantId)
                .ToListAsync();

            var scheduleDtos = schedules
                .Select(s =>
                {
                    var firstAppointment = s.Appointments.OrderBy(a => a.StartTime).FirstOrDefault();
                    return new ScheduleDTO
                    {
                        ScheduleId = s.ScheduleId,
                        AvailableDate = s.AvailableDate,
                        StartTime = s.StartTime,
                        EndTime = s.EndTime,
                        Slot = s.Slot,
                        FullName = firstAppointment?.Account?.FullName ?? string.Empty,
                        AccountId = firstAppointment?.AccountId ?? 0,
                        Status = firstAppointment?.Status ?? "unbooked"
                    };
                })
                .ToList();

            return scheduleDtos;
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

            // Get consultant name for response
            var consultant = await _context.Consultants
                .Include(c => c.Account)
                .FirstOrDefaultAsync(c => c.ConsultantId == request.ConsultantId);

            return new AppointmentResponseDTO
            {
                AppointmentId = appointment.AppointmentId,
                ConsultantId = appointment.ConsultantId,
                ScheduleId = appointment.ScheduleId,
                ConsultantName = consultant?.Account?.FullName ?? "",
                AccountName = null, // Will be populated if needed
                Date = DateTime.UtcNow.Date, // You might want to get this from schedule
                StartTime = appointment.StartTime,
                EndTime = appointment.EndTime,
                Price = (float)appointment.Price,
                Status = appointment.Status,
                Notes = appointment.Notes
            };
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
        public async Task<AppointmentResponseDTO> UpdateAppointmentStatusByScheduleIdAsync(int scheduleId, string status)
        {
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.ScheduleId == scheduleId);

            if (appointment == null) return null;

            appointment.Status = status;
            await _repo.UpdateAsync(appointment);
            await _repo.SaveChangesAsync();

            return await GetAppointmentByIdAsync(appointment.AppointmentId);
        }

        // Test method to check compilation
        public string TestCompilation()
        {
            return "Compilation successful";
        }

        //// Tạo URL thanh toán VNPay cho Appointment
        //public async Task<string> CreateVNPayPaymentUrlAsync(int appointmentId, string ipAddress)
        //{
        //    var appointment = await _repo.GetByIdAsync(appointmentId);
        //    if (appointment == null)
        //    {
        //        throw new Exception("Appointment not found!");
        //    }

        //    if (appointment.Status != "pending")
        //    {
        //        throw new Exception("Appointment must be in pending status to proceed with payment!");
        //    }

        //    string paymentUrl = _vnpayHelper.CreatePaymentUrl(
        //        appointment.AppointmentId.ToString(),  // dùng Id dạng string
        //        (decimal)appointment.Price,           // giá tiền
        //        ipAddress);

        //    return paymentUrl;
        //}

        //// Xử lý callback VNPay cho Appointment
        //public async Task<bool> HandleVNPayCallbackAsync(Dictionary<string, string> vnpayData)
        //{
        //    bool isValid = _vnpayHelper.VerifyCallback(vnpayData);
        //    if (!isValid)
        //    {
        //        return false;
        //    }

        //    string appointmentIdStr = vnpayData["vnp_TxnRef"];
        //    int appointmentId = int.Parse(appointmentIdStr);

        //    string responseCode = vnpayData["vnp_ResponseCode"];
        //    string transactionStatus = vnpayData["vnp_TransactionStatus"];

        //    var appointment = await _repo.GetByIdAsync(appointmentId);
        //    if (appointment == null)
        //    {
        //        throw new Exception("Appointment not found!");
        //    }

        //    if (responseCode == "00" && transactionStatus == "00")
        //    {
        //        appointment.Status = "paid";
        //        await _repo.UpdateAsync(appointment);
        //        await _repo.SaveChangesAsync();
        //        return true;
        //    }

        //    return false;
        //}
    }
}
