using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Data
{
    [Table("Certificate")]
    public class Certificate
    {
        [Key]
        [Column("certificate_id")]
        public int CertificateId { get; set; }
        [Column("consultant_id")]
        public int ConsultantId { get; set; }
        [Column("certificate_name")]
        public string CertificateName { get; set; }

        [ForeignKey(nameof(ConsultantId))]
        public Consultant Consultant { get; set; }
    }
}
