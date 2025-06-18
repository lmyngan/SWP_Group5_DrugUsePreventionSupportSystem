using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class ProgramParticipation
    {
        [Key]
        public int Id { get; set; }
        public int AccountId { get; set; }
        public int ProgramId { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Accounts Account { get; set; }
        [ForeignKey(nameof(ProgramId))]
        public Program Program { get; set; }
    }
}
