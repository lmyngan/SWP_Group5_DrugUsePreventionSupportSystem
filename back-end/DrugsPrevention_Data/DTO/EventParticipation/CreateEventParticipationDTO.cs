using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.EventParticipation
{
    public class CreateEventParticipationDTO
    {
        [Required]
        public int AccountId { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        public string Status { get; set; }

        public string Feedback { get; set; }
    }
}
