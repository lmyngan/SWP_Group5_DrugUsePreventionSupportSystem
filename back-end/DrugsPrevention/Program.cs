using DrugsPrevention_Data;
using DrugsPrevention_Data.Repositories;
using DrugsPrevention_Service.Service.Iservice;
using DrugsPrevention_Service;
using Microsoft.EntityFrameworkCore;
using DrugsPrevention_Data.IRepositories;
using DrugsPrevention_Service.Service;
using DrugsPrevention_Data.Repositories.Irepositories;

namespace DrugsPrevention
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure the database context (EF Core)
            builder.Services.AddDbContext<DrugsPrevention_DBContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Add CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder =>
                    {
                        builder
                            .WithOrigins("http://localhost:3000")
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
            });

            // Add other services
            builder.Services.AddAuthorization();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IAuthRepository, AuthRepository>();
            builder.Services.AddScoped<ITestService, TestService>();
            builder.Services.AddScoped<ITestRepository, TestRepository>();
            builder.Services.AddScoped<IAppointmentService, AppointmentService>();
            builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IAccountRepository, AccountRepository>();
            builder.Services.AddScoped<IEventService, EventService>();
            builder.Services.AddScoped<IEventRepository, EventRepository>();
            builder.Services.AddScoped<IBlogService, BlogService>();
            builder.Services.AddScoped<IBlogRepository, BlogRepository>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            // Use CORS middleware (must be between UseRouting and UseAuthorization)
            app.UseCors("AllowReactApp");

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
