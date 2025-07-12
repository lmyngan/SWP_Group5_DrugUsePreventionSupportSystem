using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrugsPrevention_Data.Data
{
    [Table("ExternalLogins")]
    public class ExternalLogins
    {
        [Key]
        [Column("external_login_id")]
        public int ExternalLoginId { get; set; }

        [Column("provider")]
        [MaxLength(50)]
        public string Provider { get; set; }

        [Column("provider_key")]
        public string ProviderKey { get; set; }

        [Column("account_id")]
        public int AccountId { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        // Navigation property
        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
    }
}
