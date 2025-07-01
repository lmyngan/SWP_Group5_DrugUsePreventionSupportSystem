using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Event
{
    public class UpdateEventDto : CreateEventDto
    {
        public int EventId { get; set; }
    }
}
