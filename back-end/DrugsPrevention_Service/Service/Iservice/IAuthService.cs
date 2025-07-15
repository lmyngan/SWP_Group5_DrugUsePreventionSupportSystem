using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Register;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IAuthService
    {
        Task<string> LoginAsync(string accountName, string password);
        Task<bool> RegisterAccount(RegisterRequestDTO request);
        Task MigratePlaintextPasswordsToHash();
        Task<string> LoginWithExternalProviderAsync(string idToken);
    }
}
