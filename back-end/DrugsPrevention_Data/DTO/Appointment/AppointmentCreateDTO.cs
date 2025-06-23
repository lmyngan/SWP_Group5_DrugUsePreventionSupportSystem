using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Appointment
{
    public class AppointmentCreateDTO
    {
        public int AccountId { get; set; }
        public int ConsultantId { get; set; }
        public int ScheduleId { get; set; }
        public double Price { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
