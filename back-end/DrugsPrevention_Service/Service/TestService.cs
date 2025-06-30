using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;

        public TestService(ITestRepository testRepository)
        {
            _testRepository = testRepository;
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
                    var options = await _testRepository.GetOptionsByQuestionIdAsync(answer.QuestionId);
                    var selected = options.FirstOrDefault(o => o.OptionId == answer.OptionId.Value);

                    if (selected != null)
                    {
                        score = selected.Score;
                        totalScore += score.Value;
                    }
                }

                answerResults.Add(new AnswerResultDTO
                {
                    QuestionId = answer.QuestionId,
                    AnswerText = answer.AnswerText,
                    Score = score
                });
            }

            var riskLevel = GetRiskLevel(totalScore);
            var recommendation = GetRecommendation(riskLevel);

            if (submission.AccountId.HasValue)
            {
                var result = new TestResult
                {
                    AccountId = submission.AccountId.Value,
                    TestId = submission.TestId,
                    RiskLevel = riskLevel,
                    Recommended = recommendation,
                    Score = totalScore,
                    AssessedAt = DateTime.UtcNow
                };

                var savedResult = await _testRepository.AddTestResultAsync(result);

                var answerEntities = answerResults.Select(a => new TestAnswer
                {
                    ResultId = savedResult.ResultId,
                    QuestionId = a.QuestionId,
                    AnswerText = a.AnswerText,
                    CreatedAt = DateTime.UtcNow
                }).ToList();

                await _testRepository.AddTestAnswersAsync(answerEntities);
            }

            return new TestResultDTO
            {
                RiskLevel = riskLevel,
                Recommendation = recommendation,
                Score = totalScore,
                Answers = answerResults
            };
        }

        private string GetRiskLevel(int score)
        {
            if (score >= 8) return "high";
            if (score >= 4) return "moderate";
            return "low";
        }

        private string GetRecommendation(string level)
        {
            return level switch
            {
                "high" => "Seek professional help immediately.",
                "moderate" => "Consider consulting a specialist.",
                _ => "Maintain current lifestyle."
            };
        }

        public async Task<TestResponseDTO> GetTestByIdAsync(int testId)
        {
            var test = await _testRepository.GetTestByIdAsync(testId);
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
            return await _testRepository.GetTestResultDetailsAsync(resultId);
        }

        public async Task<List<TestQuestionWithAnswersDTO>> GetTestQuestionsWithDetailsAsync(int testId, int? resultId = null)
        {
            return await _testRepository.GetTestQuestionsWithAnswersAsync(testId, resultId);
        }
    }
}
