using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Notifications
    {
        [Key]
        public int NotificationId { get; set; }
        public int AccountId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
    }
}
