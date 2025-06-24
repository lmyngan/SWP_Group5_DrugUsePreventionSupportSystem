using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;

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
            return await _testRepository.SubmitTestAsync(submission);
        }

        public async Task<TestResponseDTO> GetTestByIdAsync(int testId)
        {
            return await _testRepository.GetTestByIdAsync(testId);
        }
    }
}