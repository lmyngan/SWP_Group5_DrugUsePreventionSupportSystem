using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories
{
    public class TestRepository : ITestRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public TestRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<TestResultDTO> SubmitTestAsync(TestSubmissionDTO submission)
        {
            var riskLevel = submission.Answers.Any(a => a.AnswerText.ToLower() == "yes") ? "high" : "low";
            var recommendation = riskLevel == "high" ? "Seek professional help." : "Maintain current lifestyle.";

            if (submission.AccountId.HasValue)
            {
                var result = new TestResult
                {
                    AccountId = submission.AccountId.Value,
                    TestId = submission.TestId,
                    RiskLevel = riskLevel,
                    Recommended = recommendation,
                    AssessedAt = DateTime.Now
                };

                _context.TestResults.Add(result);
                await _context.SaveChangesAsync();

                foreach (var answer in submission.Answers)
                {
                    _context.TestAnswers.Add(new TestAnswer
                    {
                        ResultId = result.ResultId,
                        QuestionId = answer.QuestionId,
                        AnswerText = answer.AnswerText,
                        CreatedAt = DateTime.Now
                    });
                }

                await _context.SaveChangesAsync();
            }

            return new TestResultDTO
            {
                RiskLevel = riskLevel,
                Recommendation = recommendation
            };
        }

        public async Task<TestResponseDTO> GetTestByIdAsync(int testId)
        {
            var test = await _context.Tests.Include(t => t.CreatedByAccount)
                .FirstOrDefaultAsync(t => t.TestId == testId);

            if (test == null) return null;

            return new TestResponseDTO
            {
                TestId = test.TestId,
                Name = test.Name,
                Description = test.Description,
                CreatedAt = test.CreatedAt,
                CreatedBy = test.CreatedBy,
                CreatedByName = test.CreatedByAccount?.FullName
            };
        }
    }
}