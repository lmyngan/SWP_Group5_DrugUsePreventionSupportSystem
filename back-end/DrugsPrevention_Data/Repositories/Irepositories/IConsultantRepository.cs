using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DrugsPrevention_Data.Data;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface IConsultantRepository
    {
        Task<Consultant> GetConsultantByIdAsync(int consultantId);
        Task<List<Consultant>> GetAllConsultantsAsync();
        Task UpdateConsultantAsync(Consultant consultant);
        Task SaveChangesAsync();
    }
}