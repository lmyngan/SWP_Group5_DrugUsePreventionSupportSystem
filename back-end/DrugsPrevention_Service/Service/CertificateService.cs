using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Certificate;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;

namespace DrugsPrevention_Service.Service
{
    public class CertificateService : ICertificateService
    {
        private readonly ICertificateRepository _repo;

        public CertificateService(ICertificateRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<CertificateDTO>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(c => new CertificateDTO
            {
                CertificateId = c.CertificateId,
                ConsultantId = c.ConsultantId,
                CertificateName = c.CertificateName
            }).ToList();
        }

        public async Task<CertificateDTO> GetByIdAsync(int id)
        {
            var c = await _repo.GetByIdAsync(id);
            if (c == null) throw new Exception("Certificate not found");

            return new CertificateDTO
            {
                CertificateId = c.CertificateId,
                ConsultantId = c.ConsultantId,
                CertificateName = c.CertificateName
            };
        }

        public async Task<CertificateDTO> CreateAsync(CreateCertificateDTO dto)
        {
            var entity = new Certificate
            {
                ConsultantId = dto.ConsultantId,
                CertificateName = dto.CertificateName
            };
            var created = await _repo.AddAsync(entity);

            return new CertificateDTO
            {
                CertificateId = created.CertificateId,
                ConsultantId = created.ConsultantId,
                CertificateName = created.CertificateName
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdateCertificateDTO dto)
        {
            var cert = await _repo.GetByIdAsync(id);
            if (cert == null) return false;

            cert.CertificateName = dto.CertificateName;
            return await _repo.UpdateAsync(cert);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            return await _repo.DeleteAsync(id);
        }
    }
}
