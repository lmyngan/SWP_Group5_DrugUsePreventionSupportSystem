using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Notification
{
    public class NotificationResponseDTO
    {
        public int NotificationId { get; set; }
        public int AccountId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
    }
}
