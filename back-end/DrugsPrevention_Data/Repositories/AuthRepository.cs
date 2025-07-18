﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DrugsPrevention_Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public AuthRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<Accounts> GetUserByAccountNameAsync(string accountName)
        {
            return await _context.Accounts
                .Include(a => a.Role)
                .FirstOrDefaultAsync(a => a.Accountname == accountName);
        }

        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            return await _context.Role.FirstOrDefaultAsync(r => r.RoleName == roleName);
        }

        public async Task<bool> AccountExistsAsync(string accountName)
        {
            return await _context.Accounts.AnyAsync(a => a.Accountname == accountName);
        }

        public async Task AddAccountAsync(Accounts account)
        {
            await _context.Accounts.AddAsync(account);
        }
        public async Task<List<Accounts>> GetAllAccountsAsync()
        {
            return await _context.Accounts.ToListAsync();
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
        public async Task<Accounts> GetUserByExternalLoginAsync(string provider, string providerKey)
        {
            var externalLogin = await _context.ExternalLogins
                .Include(e => e.Account)
                .ThenInclude(a => a.Role)
                .FirstOrDefaultAsync(e => e.Provider == provider && e.ProviderKey == providerKey);

            return externalLogin?.Account;
        }

        public async Task AddExternalLoginAsync(ExternalLogins externalLogin)
        {
            await _context.ExternalLogins.AddAsync(externalLogin);
        }

    }
}
