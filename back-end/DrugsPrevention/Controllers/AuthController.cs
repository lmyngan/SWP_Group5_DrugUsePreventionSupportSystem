using DrugsPrevention_Data.DTO.ExternalLogin;
using DrugsPrevention_Data.DTO.Login;
using DrugsPrevention_Data.DTO.Password;
using DrugsPrevention_Data.DTO.Register;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
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

        public AuthController(
            IAuthService authService,
            IForgotPasswordService forgotPasswordService)
        {
            _authService = authService;
            _forgotPasswordService = forgotPasswordService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
        {
            var result = await _authService.RegisterAccount(request);
            if (!result)
            {
                return BadRequest(new { message = "Tên tài khoản đã tồn tại hoặc vai trò không hợp lệ!" });
            }
            return Ok(new { message = "Đăng ký thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var token = await _authService.LoginAsync(request.Accountname, request.Password);
            if (token == null) return Unauthorized(new { message = "Sai tên đăng nhập hoặc mật khẩu." });
            return Ok(new { Token = token });
        }

        [HttpPost("migrate-passwords")]
        public async Task<IActionResult> MigratePasswords()
        {
            await _authService.MigratePlaintextPasswordsToHash();
            return Ok(new { message = "Hash mật khẩu thành công!" });
        }

        [HttpPost("login-google")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] ExternalLoginRequestDTO request)
        {
            var token = await _authService.LoginWithGoogleAsync(request.IdToken);
            if (token == null)
                return Unauthorized(new { message = "Đăng nhập bằng Google thất bại!" });

            return Ok(new { Token = token });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO model)
        {
            var result = await _forgotPasswordService.ForgotPasswordAsync(model.Email);
            if (!result)
                return BadRequest(new { message = "Email không tồn tại." });

            return Ok(new { message = "Đã gửi email đặt lại mật khẩu." });
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
