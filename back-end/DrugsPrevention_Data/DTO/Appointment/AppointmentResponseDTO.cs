using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Appointment
{
    public class AppointmentResponseDTO
    {
        public int AppointmentId { get; set; }
        public string ConsultantName { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public float Price { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
    }
}
