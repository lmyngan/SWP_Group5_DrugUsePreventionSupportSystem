using DrugsPrevention_API.Attributes;
using DrugsPrevention_Data.DTO.Account;
using DrugsPrevention_Service.Service.Iservice;
using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [AuthorizeByRole(1, 2, 3, 4)]
        [HttpGet("{accountId}")]
        public async Task<IActionResult> GetUserById(int accountId)
        {
            try
            {
                var result = await _accountService.GetUserByIdAsync(accountId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
        [AuthorizeByRole(1, 2)]
        [HttpGet]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _accountService.GetAllAccountDTOsAsync();
            return Ok(accounts);
        }
        [AuthorizeByRole(1)]
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountRequestDTO request)
        {
            try
            {
                var created = await _accountService.CreateAccountAsync(request);
                return Ok(new { message = "Tạo tài khoản thành công", accountId = created.AccountId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AuthorizeByRole(1)]
        [HttpPut("{accountId}")]
        public async Task<IActionResult> UpdateAccount(int accountId, [FromBody] UpdateAccountRequestDTO request)
        {
            try
            {
                var updated = await _accountService.UpdateAccountAsync(accountId, request);
                return Ok(new { message = "Cập nhật thành công", accountId = updated.AccountId });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [AuthorizeByRole(1)]
        [HttpDelete("{accountId}")]
        public async Task<IActionResult> DeleteAccount(int accountId)
        {
            var deleted = await _accountService.DeleteAccountAsync(accountId);
            if (!deleted)
                return NotFound(new { message = "Không tìm thấy tài khoản để xoá" });

            return Ok(new { message = "Xoá thành công" });
        }
        [AuthorizeByRole(1, 2, 3, 4)] // Member có thể chỉnh profile
        [HttpPut("{accountId}/profile")]
        public async Task<IActionResult> UpdateAccountProfile(int accountId, [FromBody] UpdateAccountProfileRequestDTO request)
        {
            try
            {
                var updated = await _accountService.UpdateAccountProfileAsync(accountId, request);
                return Ok(new { message = "Cập nhật thông tin cá nhân thành công", accountId = updated.AccountId });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

    }
}