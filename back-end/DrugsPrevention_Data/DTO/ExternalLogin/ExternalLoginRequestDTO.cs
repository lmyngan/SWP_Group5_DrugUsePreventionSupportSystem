using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.DTO.ExternalLogin
{
    public class ExternalLoginRequestDTO
    {
        public string Provider { get; set; }  // "Google"
        public string ProviderKey { get; set; } // unique id của Google
        public string Email { get; set; } // email user
        public string IdToken { get; set; }
    }

}
