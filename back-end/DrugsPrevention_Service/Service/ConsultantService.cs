using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Consultant;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public async Task<List<ConsultantResponseDTO>> GetAllConsultantsAsync()
        {
            var consultants = await _repository.GetAllConsultantsAsync();

            return consultants.Select(consultant => new ConsultantResponseDTO
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
            }).ToList();
        }
        public async Task<ConsultantResponseDTO> UpdateConsultantProfileAsync(int consultantId, ConsultantUpdateDTO dto)
        {
            var consultant = await _repository.GetConsultantByIdAsync(consultantId);
            if (consultant == null)
                throw new Exception("Consultant not found");

            // Cập nhật thông tin
            consultant.Certificate = dto.Certificate;
            consultant.Price = dto.Price;

            if (consultant.Account != null)
            {
                consultant.Account.FullName = dto.FullName;
                consultant.Account.Gender = dto.Gender;
                consultant.Account.DateOfBirth = dto.DateOfBirth;
                consultant.Account.Address = dto.Address;
            }

            await _repository.UpdateConsultantAsync(consultant);
            await _repository.SaveChangesAsync();

            return ToResponseDTO(consultant);
        }

        private ConsultantResponseDTO ToResponseDTO(Consultant consultant)
        {
            return new ConsultantResponseDTO
            {
                ConsultantId = consultant.ConsultantId,
                AccountId = consultant.AccountId,
                FullName = consultant.Account?.FullName,
                Accountname = consultant.Account?.Accountname,
                Gender = consultant.Account?.Gender,
                DateOfBirth = consultant.Account?.DateOfBirth,
                Address = consultant.Account?.Address,
                Certificate = consultant.Certificate,
                Price = consultant.Price,
                CertificateNames = consultant.Certificates?.Select(c => c.CertificateName).ToList()
            };
        }
    }
}

