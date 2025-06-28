using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Event
{
    public class EventDto
    {
        public int EventId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }

        public int CreatedBy { get; set; } 

        public int CreatorAccountId { get; set; }
        public string CreatorAccountname { get; set; }
        public string CreatorFullName { get; set; }
    }
}
