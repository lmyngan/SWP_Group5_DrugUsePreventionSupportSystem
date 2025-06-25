using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
            int totalScore = 0;
            var answerResults = new List<AnswerResultDTO>();

            foreach (var answer in submission.Answers)
            {
                int? score = null;
                if (answer.OptionId.HasValue)
                {
                    var option = await _context.TestOptions
                        .FirstOrDefaultAsync(o => o.OptionId == answer.OptionId.Value);

                    if (option != null)
                    {
                        score = option.Score;
                        totalScore += score ?? 0;
                    }
                }

                answerResults.Add(new AnswerResultDTO
                {
                    QuestionId = answer.QuestionId,
                    AnswerText = answer.AnswerText,
                    Score = score
                });
            }

            string riskLevel = totalScore >= 5 ? "high" : "low";
            string recommendation = riskLevel == "high" ? "Seek professional help." : "Maintain current lifestyle.";

            if (submission.AccountId.HasValue)
            {
                var result = new TestResult
                {
                    AccountId = submission.AccountId.Value,
                    TestId = submission.TestId,
                    RiskLevel = riskLevel,
                    Recommended = recommendation,
                    Score = totalScore,
                    AssessedAt = DateTime.Now
                };

                _context.TestResults.Add(result);
                await _context.SaveChangesAsync();

                foreach (var answer in answerResults)
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
                Recommendation = recommendation,
                Score = totalScore,
                Answers = answerResults
            };
        }

        public async Task<TestResponseDTO> GetTestByIdAsync(int testId)
        {
            var test = await _context.Tests
                .Include(t => t.CreatedByAccount)
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
        public async Task<UserTestResultDTO> GetTestResultDetailsAsync(int resultId)
        {
            var result = await _context.TestResults
                .Include(r => r.Answers)
                .Include(r => r.Test)
                .Include(r => r.Account)
                .FirstOrDefaultAsync(r => r.ResultId == resultId);

            if (result == null) return null;

            var answers = await _context.TestAnswers
                .Where(a => a.ResultId == resultId)
                .Select(a => new UserTestAnswerDTO
                {
                    QuestionId = a.QuestionId,
                    QuestionText = _context.TestQuestions.FirstOrDefault(q => q.QuestionId == a.QuestionId).QuestionText,
                    SelectedAnswer = a.AnswerText,
                    Score = _context.TestOptions.FirstOrDefault(o => o.QuestionId == a.QuestionId && o.OptionText == a.AnswerText).Score
                })
                .ToListAsync();

            return new UserTestResultDTO
            {
                ResultId = result.ResultId,
                AccountId = result.AccountId,
                TestId = result.TestId,
                RiskLevel = result.RiskLevel,
                Recommendation = result.Recommended,
                Score = result.Score,
                AssessedAt = result.AssessedAt,
                Answers = answers
            };
        }

    }
}
