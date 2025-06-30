using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DrugsPrevention_Data.DTO.Consultant
{
    public class ConsultantResponseDTO
    {
        public int ConsultantId { get; set; }
        public int AccountId { get; set; }
        public string FullName { get; set; }
        public string Accountname { get; set; }
        public string Certificate { get; set; }
        public double Price { get; set; }
        public List<string> CertificateNames { get; set; }
    }
}
