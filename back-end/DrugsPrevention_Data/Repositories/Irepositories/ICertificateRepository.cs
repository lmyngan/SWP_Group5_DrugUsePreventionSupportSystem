using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface ICertificateRepository
    {
        Task<List<Certificate>> GetAllAsync();
        Task<Certificate> GetByIdAsync(int id);
        Task<Certificate> AddAsync(Certificate certificate);
        Task<bool> UpdateAsync(Certificate certificate);
        Task<bool> DeleteAsync(int id);
    }
}
