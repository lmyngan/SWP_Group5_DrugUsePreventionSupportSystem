using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }
        public int AccountId { get; set; }
        public int ConsultantId { get; set; }
        public int ScheduleId { get; set; }
        public float Price { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Status { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
        [ForeignKey(nameof(ConsultantId))]
        public Consultant Consultant { get; set; }
        [ForeignKey(nameof(ScheduleId))]
        public Schedule Schedule { get; set; }
    }
}
