using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    public class Program
    {
        [Key]
        public int ProgramId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public int CreatedBy { get; set; }
        public string Type { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public Accounts Creator { get; set; }
        public ICollection<ProgramParticipation> Participations { get; set; }
    }
}
