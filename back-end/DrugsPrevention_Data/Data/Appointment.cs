using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    [Table("Appointment")]
    public class Appointment
    {
        [Key]
        [Column("appointment_id")]
        public int AppointmentId { get; set; }
        [Column("account_id")]
        public int AccountId { get; set; }
        [Column("consultant_id")]
        public int ConsultantId { get; set; }
        [Column("schedule_id")]
        public int ScheduleId { get; set; }
        [Column("price")]
        public double Price { get; set; }
        [Column("start_time")]
        public TimeSpan StartTime { get; set; }
        [Column("end_time")]
        public TimeSpan EndTime { get; set; }
        [Column("status")]
        public string Status { get; set; }
        [Column("notes")]
        public string Notes { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
        [ForeignKey(nameof(ConsultantId))]
        public Consultant Consultant { get; set; }
        [ForeignKey(nameof(ScheduleId))]
        public Schedule Schedule { get; set; }
    }
}
