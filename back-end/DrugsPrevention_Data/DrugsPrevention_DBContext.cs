using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace DrugsPrevention_Data
{
    public class DrugsPrevention_DBContext : DbContext
    {
        public DrugsPrevention_DBContext(DbContextOptions<DrugsPrevention_DBContext> options)
            : base(options)
        {
        }

        public DbSet<Role> Role { get; set; }
        public DbSet<Accounts> Accounts { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<TestQuestion> TestQuestions { get; set; }
        public DbSet<TestOption> TestOptions { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<TestAnswer> TestAnswers { get; set; }
        public DbSet<Consultant> Consultants { get; set; }
        public DbSet<Certificate> Certificates { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventParticipation> EventParticipations { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Blogs> Blogs { get; set; }
        public DbSet<ExternalLogins> ExternalLogins { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Role
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin" },
                new Role { RoleId = 2, RoleName = "Manager" },
                new Role { RoleId = 3, RoleName = "Consultant" },
                new Role { RoleId = 4, RoleName = "User" }
            );

            // Accounts -> Role
            modelBuilder.Entity<Accounts>()
                .HasOne(a => a.Role)
                .WithMany(r => r.Accounts)
                .HasForeignKey(a => a.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Test -> Account
            modelBuilder.Entity<Test>()
                .HasOne(t => t.CreatedByAccount)
                .WithMany(a => a.CreatedTests)
                .HasForeignKey(t => t.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // TestQuestion -> Test
            modelBuilder.Entity<TestQuestion>()
                .HasOne(q => q.Test)
                .WithMany(t => t.Questions)
                .HasForeignKey(q => q.TestId)
                .OnDelete(DeleteBehavior.Cascade);

            // TestOption -> TestQuestion
            modelBuilder.Entity<TestOption>()
                .HasOne(o => o.Question)
                .WithMany(q => q.Options)
                .HasForeignKey(o => o.QuestionId)
                .OnDelete(DeleteBehavior.Cascade);

            // TestResult -> Test & Account
            modelBuilder.Entity<TestResult>().ToTable("TestResult")
                .HasOne(r => r.Test)
                .WithMany(t => t.Results)
                .HasForeignKey(r => r.TestId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TestResult>().ToTable("TestResult")
                .HasOne(r => r.Account)
                .WithMany(a => a.TestResults)
                .HasForeignKey(r => r.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // TestAnswer -> TestResult & TestQuestion
            modelBuilder.Entity<TestAnswer>()
                .HasOne(a => a.Result)
                .WithMany(r => r.Answers)
                .HasForeignKey(a => a.ResultId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TestAnswer>()
                .HasOne(a => a.Question)
                .WithMany(q => q.Answers)
                .HasForeignKey(a => a.QuestionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Consultant -> Account
            modelBuilder.Entity<Consultant>()
                .HasOne(c => c.Account)
                .WithMany()
                .HasForeignKey(c => c.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Certificate -> Consultant
            modelBuilder.Entity<Certificate>()
                .HasOne(c => c.Consultant)
                .WithMany(c => c.Certificates)
                .HasForeignKey(c => c.ConsultantId)
                .OnDelete(DeleteBehavior.Cascade);

            // EventParticipation -> Event & Account
            modelBuilder.Entity<EventParticipation>()
                .HasOne(p => p.Event)
                .WithMany(e => e.Participations)
                .HasForeignKey(p => p.EventId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<EventParticipation>()
                .HasOne(p => p.Account)
                .WithMany(a => a.EventParticipations)
                .HasForeignKey(p => p.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Schedule -> Consultant
            modelBuilder.Entity<Schedule>()
                .HasOne(s => s.Consultant)
                .WithMany(c => c.Schedules)
                .HasForeignKey(s => s.ConsultantId)
                .OnDelete(DeleteBehavior.Restrict);

            // Appointment -> Schedule & Account
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Schedule)
                .WithMany(s => s.Appointments)
                .HasForeignKey(a => a.ScheduleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Account)
                .WithMany(a => a.Appointments)
                .HasForeignKey(a => a.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Notifications -> Account
            modelBuilder.Entity<Notifications>()
                .HasOne(n => n.Account)
                .WithMany()
                .HasForeignKey(n => n.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Blogs -> Account
            modelBuilder.Entity<Blogs>()
                .HasOne(b => b.Account)
                .WithMany(a => a.Blogs)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            // ExternalLogins -> Accounts
            modelBuilder.Entity<ExternalLogins>()
                .HasOne(e => e.Account)
                .WithMany(a => a.ExternalLogins)
                .HasForeignKey(e => e.AccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ExternalLogins>()
                .HasIndex(e => new { e.Provider, e.ProviderKey })
                .IsUnique();
        }
    }
}
