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
        Task<TestResultDTO> SubmitTestAsync(TestSubmissionDTO submission);
        Task<TestResponseDTO> GetTestByIdAsync(int testId);
    }
}
