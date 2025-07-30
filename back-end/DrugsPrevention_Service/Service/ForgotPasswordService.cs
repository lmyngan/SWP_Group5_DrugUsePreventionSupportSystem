using DrugsPrevention_Data;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class ForgotPasswordService : IForgotPasswordService
    {
        private readonly DrugsPrevention_DBContext _context;
        private readonly IMailtrapService _mailerService;
        private readonly IConfiguration _configuration;

        public ForgotPasswordService(DrugsPrevention_DBContext context, IMailtrapService mailerService, IConfiguration configuration)
        {
            _context = context;
            _mailerService = mailerService;
            _configuration = configuration;
        }

        public async Task<bool> ResetPasswordAsync(string token, string newPassword)
        {
            var email = ValidatePasswordResetToken(token);
            if (string.IsNullOrEmpty(email))
                return false;

            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);
            if (account == null)
                return false;

            account.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _context.SaveChangesAsync();
            return true;
        }

        private string ValidatePasswordResetToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return principal.FindFirst(ClaimTypes.Email)?.Value;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> ForgotPasswordAsync(string email)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);
            if (account == null)
                return false;

            var token = GeneratePasswordResetToken(email);
            await _mailerService.SendResetPasswordEmail(email, account.FullName, token);

            return true;
        }
        private string GeneratePasswordResetToken(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.Email, email)
    };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
