using DrugsPrevention_Data.DTO.ExternalLogin;
using DrugsPrevention_Data.DTO.Login;
using DrugsPrevention_Data.DTO.Register;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IGoogleAuthService _googleService;

        public AuthController(IAuthService authService, IGoogleAuthService googleService)
        {
            _authService = authService;
            _googleService = googleService;
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

        [HttpPost("login-google")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] ExternalLoginRequestDTO request)
        {
            var token = await _authService.LoginWithGoogleAsync(request.IdToken);
            if (token == null)
                return Unauthorized(new { message = "Đăng nhập bằng Google thất bại!" });

            return Ok(new { Token = token });
        }

        [HttpPost("migrate-passwords")]
        public async Task<IActionResult> MigratePasswords()
        {
            await _authService.MigratePlaintextPasswordsToHash();
            return Ok(new { message = "Hash mật khẩu thành công!" });
        }
    }
}
