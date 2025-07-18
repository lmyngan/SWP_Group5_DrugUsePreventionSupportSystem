using DrugsPrevention_Data.DTO.Schedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface IScheduleService
    {
        Task<IEnumerable<ScheduleDTO>> GetAllAsync();
        Task<ScheduleDTO?> GetByIdAsync(int id);
        Task<bool> CreateAsync(ScheduleDTO dto);
        Task<bool> UpdateAsync(ScheduleDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
