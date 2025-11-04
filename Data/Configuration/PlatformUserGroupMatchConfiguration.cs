using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class PlatformUserGroupMatchConfiguration : IEntityTypeConfiguration<PlatformUserGroupMatch>
    {
        public void Configure(EntityTypeBuilder<PlatformUserGroupMatch> builder)
        {
            // Table name
            builder.ToTable("PlatformUserGroupMatch");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.UserId)
                .IsRequired()
                .HasColumnName("UserId");

            builder.Property(x => x.GroupCode)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("GroupCode");

            // Base entity properties
            builder.Property(x => x.CreatedBy)
                .HasMaxLength(50)
                .HasColumnName("CreatedBy");

            builder.Property(x => x.CreatedDate)
                .HasColumnType("datetime2")
                .HasColumnName("CreatedDate");

            builder.Property(x => x.UpdatedBy)
                .HasMaxLength(50)
                .HasColumnName("UpdatedBy");

            builder.Property(x => x.UpdatedDate)
                .HasColumnType("datetime2")
                .HasColumnName("UpdatedDate");

            builder.Property(x => x.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("IsDeleted");

            // Indexes
            builder.HasIndex(x => x.UserId)
                .HasDatabaseName("IX_PlatformUserGroupMatch_UserId");

            builder.HasIndex(x => x.GroupCode)
                .HasDatabaseName("IX_PlatformUserGroupMatch_GroupCode");

            builder.HasIndex(x => new { x.UserId, x.GroupCode })
                .IsUnique()
                .HasDatabaseName("IX_PlatformUserGroupMatch_UserId_GroupCode");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_PlatformUserGroupMatch_IsDeleted");

            // Query filter for soft delete
            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}