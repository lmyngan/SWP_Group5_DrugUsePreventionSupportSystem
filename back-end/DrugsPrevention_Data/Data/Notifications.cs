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
        [Column("notification_id")]
        public int NotificationId { get; set; }

        [Column("account_id")]
        public int AccountId { get; set; }

        [Column("message")]
        public string Message { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("status")]
        public string Status { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
    }

}
