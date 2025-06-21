using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;

namespace DrugsPrevention_Data.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public AccountRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<List<Accounts>> GetAllAsync()
        {
            return await _context.Accounts
                .Include(a => a.Role)
                .ToListAsync();
        }

        public async Task<Accounts> GetByIdAsync(int accountId)
        {
            return await _context.Accounts
                .Include(a => a.Role)
                .FirstOrDefaultAsync(a => a.AccountId == accountId);
        }

        public async Task<Role> FindRoleByIdAsync(int roleId)
        {
            return await _context.Role.FindAsync(roleId);
        }

        public async Task<int> GetAccountCountByRoleAsync(int roleId)
        {
            return await _context.Accounts.CountAsync(a => a.RoleId == roleId);
        }

        public async Task AddAsync(Accounts account)
        {
            await _context.Accounts.AddAsync(account);
        }

        public Task UpdateAsync(Accounts account)
        {
            _context.Accounts.Update(account);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Accounts account)
        {
            _context.Accounts.Remove(account);
            return Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
