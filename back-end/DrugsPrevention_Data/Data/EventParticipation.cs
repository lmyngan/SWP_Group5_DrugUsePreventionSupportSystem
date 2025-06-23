using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class EventParticipation
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("account_id")]
        public int AccountId { get; set; }

        [Column("event_id")]
        public int EventId { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [Column("feedback")]
        public string Feedback { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }

        [ForeignKey(nameof(EventId))]
        public Event Event { get; set; }
    }

}
