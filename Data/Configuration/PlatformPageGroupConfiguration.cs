using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class PlatformPageGroupConfiguration : IEntityTypeConfiguration<PlatformPageGroup>
    {
        public void Configure(EntityTypeBuilder<PlatformPageGroup> builder)
        {
            // Table name
            builder.ToTable("PlatformPageGroup");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.GroupCode)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("GroupCode");

            builder.Property(x => x.MenuHeaderId)
                .IsRequired()
                .HasColumnName("MenuHeaderId");

            builder.Property(x => x.MenuLineId)
                .IsRequired()
                .HasColumnName("MenuLineId");

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
            builder.HasIndex(x => x.GroupCode)
                .HasDatabaseName("IX_PlatformPageGroup_GroupCode");

            builder.HasIndex(x => x.MenuHeaderId)
                .HasDatabaseName("IX_PlatformPageGroup_MenuHeaderId");

            builder.HasIndex(x => x.MenuLineId)
                .HasDatabaseName("IX_PlatformPageGroup_MenuLineId");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_PlatformPageGroup_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.MenuHeaders)
                .WithMany()
                .HasForeignKey(x => x.MenuHeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.MenuLines)
                .WithMany()
                .HasForeignKey(x => x.MenuLineId)
                .OnDelete(DeleteBehavior.Restrict);

            // Query filter for soft delete
            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}