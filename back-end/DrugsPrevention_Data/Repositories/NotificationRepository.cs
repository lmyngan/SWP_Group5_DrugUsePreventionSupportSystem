using DrugsPrevention_Data.Data;
using DrugsPrevention_Data.Repositories.Irepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrugsPrevention_Data.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DrugsPrevention_DBContext _context;

        public NotificationRepository(DrugsPrevention_DBContext context)
        {
            _context = context;
        }

        public async Task AddNotificationAsync(Notifications notification)
        {
            await _context.Notifications.AddAsync(notification);
        }

        public async Task<List<Notifications>> GetNotificationsByAccountIdAsync(int accountId)
        {
            return await _context.Notifications
                .AsNoTracking()
                .Where(n => n.AccountId == accountId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
        }
        public async Task<bool> MarkAsReadAsync(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null) return false;

            notification.Status = "Read";
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
