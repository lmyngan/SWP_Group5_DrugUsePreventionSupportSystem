using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    [Table("Consultant")]
    public class Consultant
    {
        [Key]
        [Column("consultant_id")]
        public int ConsultantId { get; set; }
        [Column("account_id")]
        public int AccountId { get; set; }
        [Column("certificate")]
        public string Certificate { get; set; }
        [Column("price")]
        public double Price { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
        public ICollection<Certificate> Certificates { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}