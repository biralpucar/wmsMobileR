using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data
{
    public static class SeedData
    {
        public static void Initialize(WmsDbContext context)
        {
            // Admin kullanıcısı zaten var mı kontrol et
            if (context.Users.Any(u => u.Email == "admin@verii.com"))
            {
                return; // Zaten var, seed data'ya gerek yok
            }

            // Admin kullanıcısını oluştur
            var adminUser = new User
            {
                Username = "admin@verii.com",
                Email = "admin@verii.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Veriipass123!"),
                FirstName = "Admin",
                LastName = "User",
                RoleId = 3, // Admin role ID (UserAuthorityConfiguration'dan)
                IsEmailConfirmed = true,
                IsActive = true,
                CreatedDate = DateTime.UtcNow
            };

            context.Users.Add(adminUser);
            context.SaveChanges();
        }
    }
}