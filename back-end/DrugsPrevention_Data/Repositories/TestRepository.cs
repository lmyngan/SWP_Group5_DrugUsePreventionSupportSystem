using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Data.Repositories.Irepositories;

namespace DrugsPrevention_Data.Repositories
{
    public class TestRepository : ITestRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public TestRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task<DTO.Test.TestResultDTO> SubmitTestAsync(TestSubmissionDTO submission)
        {
            // Dummy logic: risk level = high if any answer is "Yes"
            var riskLevel = submission.Answers.Any(a => a.AnswerText.ToLower() == "yes") ? "high" : "low";
            var recommendation = riskLevel == "high" ? "Seek professional help." : "Maintain current lifestyle.";

            if (submission.AccountId.HasValue)
            {
                // Lưu kết quả khảo sát
                var result = new Data.TestResult
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

            return new DTO.Test.TestResultDTO
            {
                RiskLevel = riskLevel,
                Recommendation = recommendation
            };
        }
    }
}
