using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Register;
using DrugsPrevention_Data.IRepositories;
using DrugsPrevention_Service.Service.Iservice;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _configuration;

        public AuthService(IAuthRepository repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public async Task<string> LoginAsync(string accountName, string password)
        {
            var user = await _repository.GetUserByAccountNameAsync(accountName);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return null;
            }
            return GenerateJwtToken(user, 60);
        }

        public string GenerateJwtToken(Accounts account, int expiresInMinutes)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, account.AccountId.ToString()),
            new Claim(ClaimTypes.Name, account.Accountname),
            new Claim(ClaimTypes.Role, account.RoleId.ToString()),
            new Claim("AccountId", account.AccountId.ToString()),
            new Claim("Gender", account.Gender ?? ""),
            new Claim("Address", account.Address ?? ""),
            new Claim("DateOfBirth", account.DateOfBirth.GetValueOrDefault().ToString("yyyy-MM-dd")),
            new Claim("CreatedAt", account.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss")),

            new Claim(ClaimTypes.Email, account.Email ?? "")
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<Accounts> GetAccountByEmailAsync(string email)
        {
            var allAccounts = await _repository.GetAllAccountsAsync();
            return allAccounts.FirstOrDefault(a => a.Email == email);
        }

        public async Task<bool> RegisterAccount(RegisterRequestDTO request)
        {
            if (await _repository.AccountExistsAsync(request.Accountname))
                return false;

            var role = await _repository.GetRoleByNameAsync(request.RoleName);
            if (role == null)
                return false;

            var newAccount = new Accounts
            {
                Accountname = request.Accountname,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                FullName = request.FullName,
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                Address = request.Address,
                Email = request.Email,
                RoleId = role.RoleId,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAccountAsync(newAccount);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task MigratePlaintextPasswordsToHash()
        {
            var allAccounts = await _repository.GetAllAccountsAsync();
            foreach (var acc in allAccounts)
            {
                if (!acc.Password.StartsWith("$2a$") && !acc.Password.StartsWith("$2b$"))
                {
                    acc.Password = BCrypt.Net.BCrypt.HashPassword(acc.Password);
                }
            }
            await _repository.SaveChangesAsync();
        }
    }
}
