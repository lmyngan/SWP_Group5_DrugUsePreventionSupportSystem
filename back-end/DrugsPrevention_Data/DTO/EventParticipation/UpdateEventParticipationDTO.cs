using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.EventParticipation
{
    public class UpdateEventParticipationDTO
    {
        public int AccountId { get; set; }
        public int EventId { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }
    }
}
