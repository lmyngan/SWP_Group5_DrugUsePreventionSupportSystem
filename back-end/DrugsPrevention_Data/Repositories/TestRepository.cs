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

        public async Task<Test> GetTestByIdAsync(int testId)
        {
            return await _context.Tests
                .Include(t => t.CreatedByAccount)
                .FirstOrDefaultAsync(t => t.TestId == testId);
        }

        public async Task<List<TestQuestion>> GetTestQuestionsAsync(int testId)
        {
            return await _context.TestQuestions
                .Include(q => q.Options)
                .Where(q => q.TestId == testId)
                .ToListAsync();
        }

        public async Task<List<TestOption>> GetOptionsByQuestionIdAsync(int questionId)
        {
            return await _context.TestOptions
                .Where(o => o.QuestionId == questionId)
                .ToListAsync();
        }

        public async Task<TestResult> AddTestResultAsync(TestResult result)
        {
            _context.TestResults.Add(result);
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task AddTestAnswersAsync(List<TestAnswer> answers)
        {
            _context.TestAnswers.AddRange(answers);
            await _context.SaveChangesAsync();
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

        public async Task<List<TestQuestionWithAnswersDTO>> GetTestQuestionsWithAnswersAsync(int testId, int? resultId = null)
        {
            var questions = await _context.TestQuestions
                .Where(q => q.TestId == testId)
                .Include(q => q.Options)
                .ToListAsync();

            var answerMap = new Dictionary<int, List<TestAnswerDTO>>();

            if (resultId.HasValue)
            {
                answerMap = await _context.TestAnswers
                    .Where(a => a.ResultId == resultId.Value)
                    .GroupBy(a => a.QuestionId)
                    .ToDictionaryAsync(
                        g => g.Key,
                        g => g.Select(a => new TestAnswerDTO
                        {
                            AnswerId = a.AnswerId,
                            AnswerText = a.AnswerText,
                            CreatedAt = a.CreatedAt
                        }).ToList()
                    );
            }

            return questions.Select(q => new TestQuestionWithAnswersDTO
            {
                QuestionId = q.QuestionId,
                QuestionText = q.QuestionText,
                QuestionType = q.QuestionType,
                Options = q.Options?.Select(o => new TestOptionDTO
                {
                    OptionId = o.OptionId,
                    OptionText = o.OptionText,
                    Score = o.Score
                }).ToList(),
                Answers = answerMap.ContainsKey(q.QuestionId) ? answerMap[q.QuestionId] : new List<TestAnswerDTO>()
            }).ToList();
        }
    }
}
