using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.DTO.Certificate;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface ICertificateService
    {
        Task<List<CertificateDTO>> GetAllAsync();
        Task<CertificateDTO> GetByIdAsync(int id);
        Task<CertificateDTO> CreateAsync(CreateCertificateDTO dto);
        Task<bool> UpdateAsync(int id, UpdateCertificateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
