using DrugsPrevention_Data.DTO.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service.Iservice
{
    public interface INotificationService
    {
        Task<NotificationResponseDTO> CreateNotificationAsync(NotificationCreateDTO dto);
        Task<List<NotificationResponseDTO>> GetNotificationsByAccountIdAsync(int accountId);
    }
}
