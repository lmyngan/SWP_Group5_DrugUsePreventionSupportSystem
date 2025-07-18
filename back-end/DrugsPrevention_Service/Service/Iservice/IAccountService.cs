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
        Task<Accounts> UpdateAccountAsync(int accountId, UpdateAccountRequestDTO request);
        Task<AccountResponseDTO> GetUserByIdAsync(int accountId);
        Task<bool> DeleteAccountAsync(int accountId);
        Task<List<AccountResponseDTO>> GetAllAccountDTOsAsync();
        Task<Accounts> CreateAccountAsync(CreateAccountRequestDTO request);
        Task<Accounts> UpdateAccountProfileAsync(int accountId, UpdateAccountProfileRequestDTO request);    
    }
}
