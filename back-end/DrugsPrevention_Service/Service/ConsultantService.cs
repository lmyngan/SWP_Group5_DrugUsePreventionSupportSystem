using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Consultant;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;

namespace DrugsPrevention_Service.Service
{
    public class ConsultantService : IConsultantService
    {
        private readonly IConsultantRepository _repository;

        public ConsultantService(IConsultantRepository repository)
        {
            _repository = repository;
        }

        public async Task<ConsultantResponseDTO> GetConsultantByIdAsync(int consultantId)
        {
            var consultant = await _repository.GetConsultantByIdAsync(consultantId);
            if (consultant == null)
                throw new Exception("Consultant not found");

            return new ConsultantResponseDTO
            {
                ConsultantId = consultant.ConsultantId,
                AccountId = consultant.AccountId,
                FullName = consultant.Account.FullName,
                Accountname = consultant.Account.Accountname,
                Gender = consultant.Account.Gender,
                DateOfBirth = consultant.Account.DateOfBirth,
                Address = consultant.Account.Address,
                Certificate = consultant.Certificate,
                Price = consultant.Price,
                CertificateNames = consultant.Certificates?.Select(c => c.CertificateName).ToList()
            };
        }
    }
}

