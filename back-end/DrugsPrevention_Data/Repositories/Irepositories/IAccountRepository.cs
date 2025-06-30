using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IAccountRepository
    {
        Task<List<Accounts>> GetAllAsync();
        Task<Accounts> GetByIdAsync(int accountId);
        Task<Role> FindRoleByIdAsync(int roleId);
        Task<int> GetAccountCountByRoleAsync(int roleId);
        Task AddAsync(Accounts account);
        Task UpdateAsync(Accounts account);
        Task DeleteAsync(Accounts account);
        Task<Accounts> GetAccountByIdAsync(int accountId);
        Task<int?> GetConsultantIdByAccountIdAsync(int accountId);
        Task SaveChangesAsync();
    }
}