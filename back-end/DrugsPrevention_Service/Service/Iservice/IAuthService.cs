using DrugsPrevention_Data.Data;
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
        string GenerateJwtToken(Accounts account, int expiresInMinutes);
        Task<Accounts> GetAccountByEmailAsync(string email);
    }
}
