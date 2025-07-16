using DrugsPrevention_Data.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories.Irepositories
{
    public interface INotificationRepository
    {
        Task AddNotificationAsync(Notifications notification);
        Task<List<Notifications>> GetNotificationsByAccountIdAsync(int accountId);
        Task SaveChangesAsync();
    }
}
