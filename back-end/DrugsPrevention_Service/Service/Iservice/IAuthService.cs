using DrugsPrevention_Data.DTO.ExternalLogin;
using DrugsPrevention_Data.DTO.Register;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string accountName, string password);
        Task<bool> RegisterAccount(RegisterRequestDTO request);
        Task MigratePlaintextPasswordsToHash();
        Task<string> LoginWithGoogleAsync(string idToken);
    }
}
