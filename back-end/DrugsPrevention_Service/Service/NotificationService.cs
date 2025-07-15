using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.DTO.Notification;
using DrugsPrevention_Data.Repositories.Irepositories;
using DrugsPrevention_Service.Service.Iservice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Service.Service
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;

        public NotificationService(INotificationRepository repository)
        {
            _repository = repository;
        }

        public async Task<NotificationResponseDTO> CreateNotificationAsync(NotificationCreateDTO dto)
        {
            var notification = new Notifications
            {
                AccountId = dto.AccountId,
                Message = dto.Message,
                CreatedAt = DateTime.UtcNow,
                Status = "Unread"
            };

            await _repository.AddNotificationAsync(notification);
            await _repository.SaveChangesAsync();

            return new NotificationResponseDTO
            {
                NotificationId = notification.NotificationId,
                AccountId = notification.AccountId,
                Message = notification.Message,
                CreatedAt = notification.CreatedAt,
                Status = notification.Status
            };
        }

        public async Task<List<NotificationResponseDTO>> GetNotificationsByAccountIdAsync(int accountId)
        {
            var notifications = await _repository.GetNotificationsByAccountIdAsync(accountId);

            return notifications.Select(n => new NotificationResponseDTO
            {
                NotificationId = n.NotificationId,
                AccountId = n.AccountId,
                Message = n.Message,
                CreatedAt = n.CreatedAt,
                Status = n.Status
            }).ToList();
        }
    }
}
