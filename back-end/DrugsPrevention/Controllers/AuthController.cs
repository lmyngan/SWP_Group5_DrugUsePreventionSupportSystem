using DrugsPrevention_Data.DTO.Login;
using DrugsPrevention_Data.DTO.Password;
using DrugsPrevention_Data.DTO.Register;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IForgotPasswordService _forgotPasswordService;
        private readonly IConfiguration _configuration;
        private readonly IMailtrapService _mailerService;

        public AuthController(
            IAuthService authService,
            IForgotPasswordService forgotPasswordService,
            IMailtrapService mailerService,
            IConfiguration configuration)
        {
            _authService = authService;
            _forgotPasswordService = forgotPasswordService;
            _mailerService = mailerService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
        {
            var result = await _authService.RegisterAccount(request);
            if (!result)
                return BadRequest(new { message = "Tên tài khoản đã tồn tại hoặc vai trò không hợp lệ!" });

            return Ok(new { message = "Đăng ký thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var token = await _authService.LoginAsync(request.Accountname, request.Password);
            if (token == null)
                return Unauthorized(new { message = "Sai tên đăng nhập hoặc mật khẩu." });

            return Ok(new { Token = token });
        }

        [HttpPost("migrate-passwords")]
        public async Task<IActionResult> MigratePasswords()
        {
            await _authService.MigratePlaintextPasswordsToHash();
            return Ok(new { message = "Hash mật khẩu thành công!" });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO request)
        {
            var account = await _authService.GetAccountByEmailAsync(request.Email);
            if (account == null)
                return BadRequest(new { message = "Email không tồn tại." });

            // Tạo token JWT có thời hạn 15 phút
            var token = _authService.GenerateJwtToken(account, expiresInMinutes: 15);

            var resetLink = $"{_configuration["ResetPasswordBaseUrl"]}?token={token}";

            await _mailerService.SendResetPasswordEmail(account.Email, account.FullName, token);

            // Gửi link về FE để test dễ hơn
            return Ok(new { message = "Đã gửi email đặt lại mật khẩu.", resetLink });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO model)
        {
            var result = await _forgotPasswordService.ResetPasswordAsync(model.Token, model.NewPassword);
            if (!result)
                return BadRequest(new { message = "Token không hợp lệ hoặc đã hết hạn." });

            return Ok(new { message = "Đặt lại mật khẩu thành công." });
        }
    }
}
