using Microsoft.AspNetCore.Mvc;

namespace DrugsPrevention_API.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
