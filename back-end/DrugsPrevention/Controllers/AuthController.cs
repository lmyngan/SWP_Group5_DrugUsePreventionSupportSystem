using Microsoft.AspNetCore.Mvc;
using DrugsPrevention_Data.DTO.Login;
using DrugsPrevention_Data.DTO.Register;
using System.Threading.Tasks;
using DrugsPrevention_Service.Service.Iservice;

namespace DrugsPrevention_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO request)
        {
            var result = await _authService.RegisterAccount(request);
            if (!result)
            {
                return BadRequest(new { message = "Account name already exists or invalid role!" });
            }

            return Ok(new { message = "Registration successful!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
        {
            var token = await _authService.LoginAsync(request.Accountname, request.Password);

            if (token == null)
                return Unauthorized(new { message = "Invalid account name or password." });

            return Ok(new { Token = token });
        }
    }
}
