using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Event
    {
        [Key]
        [Column("event_id")]
        public int EventId { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("date")]
        public DateTime Date { get; set; }
        [Column("location")]
        public string Location { get; set; }
        [Column("created_by")]
        public int CreatedBy { get; set; }
        [Column("type")]
        public string Type { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public Accounts Creator { get; set; }
        public ICollection<EventParticipation> Participations { get; set; }
    }
}
