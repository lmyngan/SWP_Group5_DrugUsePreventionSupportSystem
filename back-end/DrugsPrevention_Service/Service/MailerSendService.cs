using DrugsPrevention_Service.Service.Iservice;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class MailerSendService : IMailerSendService
    {
        private readonly IConfiguration _config;

        public MailerSendService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendResetPasswordEmail(string toEmail, string fullName, string token)
        {
            var apiToken = _config["MailerSend:ApiToken"];
            var fromEmail = _config["MailerSend:FromEmail"];
            var fromName = _config["MailerSend:FromName"];
            var resetBaseUrl = _config["MailerSend:ResetPasswordBaseUrl"];

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiToken}");

            var resetLink = $"{resetBaseUrl}?token={token}";

            var payload = new
            {
                from = new { email = fromEmail, name = fromName },
                to = new[] { new { email = toEmail, name = fullName } },
                subject = "Reset your password",
                text = $"Click the following link to reset your password: {resetLink}",
                html = $"<p>Hello {fullName},</p><p>Click <a href=\"{resetLink}\">here</a> to reset your password.</p>"
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("https://api.mailersend.com/v1/email", content);

            response.EnsureSuccessStatusCode();
        }
    }
}
