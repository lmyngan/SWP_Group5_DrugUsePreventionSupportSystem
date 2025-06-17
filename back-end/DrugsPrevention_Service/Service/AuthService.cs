using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Register;
using DrugsPrevention_Data.IRepositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using DrugsPrevention_Service.Service.Iservice;

namespace DrugsPrevention_Service
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
            if (user == null || user.Password != password)
            {
                return null;
            }

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(Accounts account)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim("AccountName", account.Accountname),
            new Claim("FullName", account.FullName ?? ""),
            new Claim(ClaimTypes.Role, account.Role?.RoleName ?? "Unknown"),
            new Claim("AccountId", account.AccountId.ToString()),
            new Claim("Gender", account.Gender ?? ""),
            new Claim("Address", account.Address ?? ""),
            new Claim("DateOfBirth", account.DateOfBirth.ToString("yyyy-MM-dd")),
            new Claim("CreatedAt", account.CreatedAt.ToString("yyyy-MM-dd HH:mm:ss"))
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
                Password = request.Password,
                FullName = request.FullName,
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                Address = request.Address,
                RoleId = role.RoleId,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAccountAsync(newAccount);
            await _repository.SaveChangesAsync();

            return true;
        }
    }

}
