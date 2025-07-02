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

        public async Task<int> SubmitTestAsync(TestResultCreateDTO submission)
        {
            var result = new TestResult
            {
                AccountId = submission.AccountId,
                TestId = submission.TestId,
                Score = submission.Score,
                RiskLevel = submission.RiskLevel,
                Recommended = submission.Recommendation,
                AssessedAt = DateTime.UtcNow
            };

            var savedResult = await _testRepository.AddTestResultAsync(result);

            return savedResult.ResultId;
        }

        //private string GetRiskLevel(int score)
        //{
        //    if (score >= 8) return "high";
        //    if (score >= 4) return "moderate";
        //    return "low";
        //}

        //private string GetRecommendation(string level)
        //{
        //    return level switch
        //    {
        //        "high" => "Seek professional help immediately.",
        //        "moderate" => "Consider consulting a specialist.",
        //        _ => "Maintain current lifestyle."
        //    };
        //}

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
        public async Task<List<UserTestResultDTO>> GetTestResultsByAccountIdAsync(int accountId)
        {
            return await _testRepository.GetTestResultsByAccountIdAsync(accountId);
        }
    }
}
