using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Accounts
    {
        [Key]
        [Column("account_id")]
        public int AccountId { get; set; }
        [Column("accountname")]
        public string Accountname { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("fullName")]
        public string FullName { get; set; }
        [Column("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }
        [Column("gender")]
        public string Gender { get; set; }
        [Column("address")]
        public string Address { get; set; }
        [Column("role_id")]
        public int RoleId { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(RoleId))]
        public Role Role { get; set; }
        public ICollection<Test> CreatedTests { get; set; }
        public ICollection<TestResult> TestResults { get; set; }
        public ICollection<Notifications> Notifications { get; set; }
        public ICollection<ProgramParticipation> ProgramParticipation { get; set; }
        public ICollection<Appointment> Appointment { get; set; }
        public ICollection<Blogs> Blogs { get; set; }
    }
}
