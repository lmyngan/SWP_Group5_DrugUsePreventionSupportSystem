using DrugsPrevention_Service.Service.Iservice;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class MailtrapService : IMailtrapService
    {
        private readonly IConfiguration _config;

        public MailtrapService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendResetPasswordEmail(string toEmail, string fullName, string token)
        {
            var smtpClient = new SmtpClient(_config["Mailtrap:Host"], int.Parse(_config["Mailtrap:Port"]))
            {
                Credentials = new NetworkCredential(
                    _config["Mailtrap:UserName"],
                    _config["Mailtrap:Password"]
                ),
                EnableSsl = true
            };

            var resetLink = $"{_config["Mailtrap:ResetPasswordBaseUrl"]}?token={token}";

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_config["Mailtrap:FromEmail"], _config["Mailtrap:FromName"]),
                Subject = "Đặt lại mật khẩu",
                Body = $"Xin chào {fullName},\n\nNhấn vào link sau để đặt lại mật khẩu:\n{resetLink}",
                IsBodyHtml = false
            };
            mailMessage.To.Add(new MailAddress(toEmail, fullName));

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
