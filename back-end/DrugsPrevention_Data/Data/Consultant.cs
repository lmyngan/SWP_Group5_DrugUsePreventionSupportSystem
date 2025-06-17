using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Consultant
    {
        [Key]
        public int ConsultantId { get; set; }
        public int AccountId { get; set; }
        public string Certificate { get; set; }
        public float Price { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
        public ICollection<Certificate> Certificates { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}
