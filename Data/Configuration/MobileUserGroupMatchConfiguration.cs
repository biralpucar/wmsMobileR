using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class MobileUserGroupMatchConfiguration : IEntityTypeConfiguration<MobileUserGroupMatch>
    {
        public void Configure(EntityTypeBuilder<MobileUserGroupMatch> builder)
        {
            // Table name
            builder.ToTable("RII_MOBIL_USER_GROUP_MATCH");

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
                .HasColumnName("GroupCode");

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
            builder.HasOne(x => x.Users)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.MobilePageGroups)
                .WithMany(x => x.UserGroupMatches)
                .UsingEntity(j => j.ToTable("RII_MOBIL_USER_PAGE_GROUP_MATCH"));

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