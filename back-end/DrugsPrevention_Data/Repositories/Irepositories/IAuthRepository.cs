using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.IRepositories
{
    public interface IAuthRepository
    {
        Task<Accounts> GetUserByAccountNameAsync(string accountName);
        Task<Role> GetRoleByNameAsync(string roleName);
        Task<bool> AccountExistsAsync(string accountName);
        Task AddAccountAsync(Accounts account);
        Task SaveChangesAsync();

    }
}
