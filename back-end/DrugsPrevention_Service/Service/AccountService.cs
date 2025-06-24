using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Account;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.Extensions.Logging;

namespace DrugsPrevention_Service.Service
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _repository;
        private readonly ILogger<AccountService> _logger;

        public AccountService(IAccountRepository repository, ILogger<AccountService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<List<Accounts>> GetAllAccountsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Accounts> GetAccountByIdAsync(int accountId)
        {
            return await _repository.GetByIdAsync(accountId);
        }

        public async Task<Accounts> CreateAccountAsync(Accounts account)
        {
            var role = await _repository.FindRoleByIdAsync(account.RoleId);
            if (role == null)
                throw new Exception("Role not found!");

            int count = await _repository.GetAccountCountByRoleAsync(account.RoleId);
            account.CreatedAt = DateTime.UtcNow;

            await _repository.AddAsync(account);
            await _repository.SaveChangesAsync();
            return account;
        }

        public async Task<Accounts> UpdateAccountAsync(int accountId, UpdateAccountRequestDTO request)
        {
            var existing = await _repository.GetByIdAsync(accountId);
            if (existing == null)
                throw new Exception("Account not found");

            existing.Accountname = request.Accountname ?? existing.Accountname;
            existing.FullName = request.FullName ?? existing.FullName;
            existing.DateOfBirth = request.DateOfBirth ?? existing.DateOfBirth;
            existing.Gender = request.Gender ?? existing.Gender;
            existing.Address = request.Address ?? existing.Address;

            await _repository.UpdateAsync(existing);
            await _repository.SaveChangesAsync();

            return existing;
        }

        public async Task<bool> DeleteAccountAsync(int accountId)
        {
            var account = await _repository.GetByIdAsync(accountId);
            if (account == null)
                return false;

            await _repository.DeleteAsync(account);
            await _repository.SaveChangesAsync();
            return true;
        }
        public async Task<AccountResponseDTO> GetUserByIdAsync(int accountId)
        {
            var user = await _repository.GetAccountByIdAsync(accountId);
            if (user == null) throw new Exception("User not found");

            return new AccountResponseDTO
            {
                AccountId = user.AccountId,
                Accountname = user.Accountname,
                FullName = user.FullName,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,
                Address = user.Address,
                RoleId = user.RoleId,
                CreatedAt = user.CreatedAt
            };
        }

    }
}
