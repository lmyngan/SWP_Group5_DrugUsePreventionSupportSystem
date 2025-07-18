using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Register;
using DrugsPrevention_Data.IRepositories;
using DrugsPrevention_Service.Service.Iservice;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServiceStack;
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
            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(Accounts account)
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
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
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

        public async Task<string> LoginWithGoogleAsync(string idToken)
        {
            var clientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID");
            if (string.IsNullOrEmpty(clientId))
                throw new Exception("GOOGLE_CLIENT_ID not set.");

            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { clientId }
            });

            var provider = "Google";
            var providerKey = payload.Subject;
            var email = payload.Email;

            var user = await _repository.GetUserByExternalLoginAsync(provider, providerKey);
            if (user == null)
            {
                var newAccount = new Accounts
                {
                    Accountname = email,
                    Password = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    FullName = payload.Name ?? email,
                    Gender = null,
                    DateOfBirth = null,
                    Address = null,
                    RoleId = 4,
                    CreatedAt = DateTime.UtcNow
                };

                await _repository.AddAccountAsync(newAccount);
                await _repository.SaveChangesAsync();

                var newExternal = new ExternalLogins
                {
                    Provider = provider,
                    ProviderKey = providerKey,
                    AccountId = newAccount.AccountId,
                    Email = email,
                    CreatedAt = DateTime.UtcNow
                };

                await _repository.AddExternalLoginAsync(newExternal);
                await _repository.SaveChangesAsync();

                user = newAccount;
            }

            return GenerateJwtToken(user);
        }

    }
}
