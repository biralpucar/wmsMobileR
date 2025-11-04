using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // Table name
            builder.ToTable("RII_USERS");

            // Primary key
            builder.HasKey(u => u.Id);

            // Properties
            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.PasswordHash)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(u => u.FirstName)
                .HasMaxLength(50);

            builder.Property(u => u.LastName)
                .HasMaxLength(50);

            builder.Property(u => u.PhoneNumber)
                .HasMaxLength(20);

            builder.Property(u => u.RoleId)
                .IsRequired()
                .HasDefaultValue(1);

            builder.Property(u => u.IsEmailConfirmed)
                .HasDefaultValue(false);

            builder.Property(u => u.RefreshToken)
                .HasMaxLength(500);

            // Foreign key relationship
            builder.HasOne(u => u.RoleNavigation)
                .WithMany()
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            builder.HasIndex(u => u.Username)
                .IsUnique()
                .HasDatabaseName("IX_RII_USERS_Username");

            builder.HasIndex(u => u.Email)
                .IsUnique()
                .HasDatabaseName("IX_RII_USERS_Email");

            // Seed data - removed to avoid migration issues with SQL Server
            // Will be handled by SeedData.cs instead
        }
    }
}