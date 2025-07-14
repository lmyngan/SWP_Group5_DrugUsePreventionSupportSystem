using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.Account
{
    public class AccountResponseDTO
    {
        public int AccountId { get; set; }
        public string Accountname { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public int RoleId { get; set; }
        public DateTime CreatedAt { get; set; }

        public int? ConsultantId { get; set; }
    }
}
