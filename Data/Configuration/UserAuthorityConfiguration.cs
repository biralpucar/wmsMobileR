using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class UserAuthorityConfiguration : IEntityTypeConfiguration<UserAuthority>
    {
        public void Configure(EntityTypeBuilder<UserAuthority> builder)
        {
            // Table name
            builder.ToTable("RII_USER_AUTHORITY");

            // Primary key
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            // Properties
            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("Title");

            // Base entity properties
            builder.Property(x => x.CreatedDate)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasColumnName("CreatedDate");

            builder.Property(x => x.UpdatedDate)
                .HasColumnType("datetime2")
                .HasColumnName("UpdatedDate");

            builder.Property(x => x.DeletedDate)
                .HasColumnType("datetime2")
                .HasColumnName("DeletedDate");

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false)
                .HasColumnName("IsDeleted");

            builder.Property(x => x.CreatedBy)
                .HasColumnName("CreatedBy");

            builder.Property(x => x.UpdatedBy)
                .HasColumnName("UpdatedBy");

            builder.Property(x => x.DeletedBy)
                .HasColumnName("DeletedBy");

            // Query filter for soft delete
            builder.HasQueryFilter(x => !x.IsDeleted);

            // Seed data
            builder.HasData(
                new UserAuthority { Id = 1, Title = "user", CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new UserAuthority { Id = 2, Title = "admin", CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new UserAuthority { Id = 3, Title = "superadmin", CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );
        }
    }
}