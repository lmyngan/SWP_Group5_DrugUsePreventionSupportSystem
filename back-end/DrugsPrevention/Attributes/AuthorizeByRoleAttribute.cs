using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Security.Claims;

namespace DrugsPrevention_API.Attributes
{
    public class AuthorizeByRoleAttribute : Attribute, IAuthorizationFilter
    {
        private readonly int[] _allowedRoles;

        public AuthorizeByRoleAttribute(params int[] roles)
        {
            _allowedRoles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (!user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var roleClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);

            if (roleClaim == null || !_allowedRoles.Contains(int.Parse(roleClaim.Value)))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
