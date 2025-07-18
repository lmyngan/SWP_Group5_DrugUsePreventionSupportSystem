using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Schedule
{
    public class BaseScheduleDTO
    {
        public int ConsultantId { get; set; }   
        public int AccountId { get; set; }  
        public int ScheduleId { get; set; }
        public DateTime AvailableDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int Slot { get; set; }
    }

}
