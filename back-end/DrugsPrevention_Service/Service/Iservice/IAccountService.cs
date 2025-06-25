using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Account;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IAccountService
    {
        Task<List<Accounts>> GetAllAccountsAsync();
        Task<Accounts> GetAccountByIdAsync(int accountId);
        Task<Accounts> CreateAccountAsync(Accounts account);
        Task<Accounts> UpdateAccountAsync(int accountId, UpdateAccountRequestDTO request);
        Task<AccountResponseDTO> GetUserByIdAsync(int accountId);
        Task<bool> DeleteAccountAsync(int accountId);
    }
}