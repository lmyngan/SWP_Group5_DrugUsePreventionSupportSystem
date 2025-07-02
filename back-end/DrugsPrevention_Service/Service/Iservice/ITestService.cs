using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Test;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface ITestService
    {
        Task<int> SubmitTestAsync(TestResultCreateDTO submission);
        Task<TestResponseDTO> GetTestByIdAsync(int testId);
        Task<UserTestResultDTO> GetTestResultDetailsAsync(int resultId);
        Task<List<TestQuestionWithAnswersDTO>> GetTestQuestionsWithDetailsAsync(int testId, int? resultId = null);
        Task<List<UserTestResultDTO>> GetTestResultsByAccountIdAsync(int accountId);
    }
}
