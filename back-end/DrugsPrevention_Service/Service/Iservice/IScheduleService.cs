using DrugsPrevention_Data.DTO.Schedule;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IScheduleService
    {
        Task<IEnumerable<BaseScheduleDTO>> GetAllAsync();
        Task<BaseScheduleDTO?> GetByIdAsync(int id);
        Task<bool> CreateAsync(BaseScheduleDTO dto); 
        Task<bool> UpdateAsync(BaseScheduleDTO dto);  
        Task<bool> DeleteAsync(int id);
    }
}
