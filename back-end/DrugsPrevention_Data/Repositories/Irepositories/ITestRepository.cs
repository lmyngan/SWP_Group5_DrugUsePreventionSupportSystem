using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Test;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Test;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface ITestRepository
    {
        Task<Test> GetTestByIdAsync(int testId);
        Task<List<TestQuestion>> GetTestQuestionsAsync(int testId);
        Task<List<TestOption>> GetOptionsByQuestionIdAsync(int questionId);
        Task<TestResult> AddTestResultAsync(TestResult result);
        Task AddTestAnswersAsync(List<TestAnswer> answers);
        Task<UserTestResultDTO> GetTestResultDetailsAsync(int resultId);
        Task<List<TestQuestionWithAnswersDTO>> GetTestQuestionsWithAnswersAsync(int testId, int? resultId = null);
        Task<List<UserTestResultDTO>> GetTestResultsByAccountIdAsync(int accountId);

    }
}

