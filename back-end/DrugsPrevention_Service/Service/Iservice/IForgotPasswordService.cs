using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IForgotPasswordService
    {
        Task<bool> SendForgotPasswordEmailAsync(string email);
        Task<bool> ResetPasswordAsync(string email, string newPassword);
        Task<bool> ForgotPasswordAsync(string email);
    }
}
