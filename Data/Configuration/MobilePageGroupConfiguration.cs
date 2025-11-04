using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class MobilePageGroupConfiguration : IEntityTypeConfiguration<MobilePageGroup>
    {
        public void Configure(EntityTypeBuilder<MobilePageGroup> builder)
        {
            // Table name
            builder.ToTable("RII_MOBIL_PAGE_GROUP");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.GroupName)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("GroupName");

            builder.Property(x => x.GroupCode)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("GroupCode");

            builder.Property(x => x.MenuHeaderId)
                .HasColumnName("MenuHeaderId");

            builder.Property(x => x.MenuLineId)
                .HasColumnName("MenuLineId");

            // Base entity properties
            builder.Property(x => x.CreatedDate)
                .HasColumnName("CreatedDate");

            builder.Property(x => x.UpdatedDate)
                .HasColumnName("UpdatedDate");

            builder.Property(x => x.DeletedDate)
                .HasColumnName("DeletedDate");

            builder.Property(x => x.IsDeleted)
                .HasColumnName("IsDeleted");

            builder.Property(x => x.CreatedBy)
                .HasColumnName("CreatedBy");

            builder.Property(x => x.UpdatedBy)
                .HasColumnName("UpdatedBy");

            builder.Property(x => x.DeletedBy)
                .HasColumnName("DeletedBy");

            // Relationships
            builder.HasOne(x => x.MenuHeaders)
                .WithMany()
                .HasForeignKey(x => x.MenuHeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.MenuLines)
                .WithMany()
                .HasForeignKey(x => x.MenuLineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.UserGroupMatches)
                .WithMany(x => x.MobilePageGroups);

            // Foreign key relationships for user tracking
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}