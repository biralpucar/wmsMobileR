using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrHeaderConfiguration : IEntityTypeConfiguration<TrHeader>
    {
        public void Configure(EntityTypeBuilder<TrHeader> builder)
        {
            // Table name
            builder.ToTable("RII_TR_HEADER");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.BranchCode)
                .HasColumnName("BranchCode")
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(x => x.ProjectCode)
                .HasColumnName("ProjectCode")
                .HasMaxLength(10);

            builder.Property(x => x.DocumentNo)
                .HasColumnName("DocumentNo")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.DocumentDate)
                .HasColumnName("DocumentDate")
                .IsRequired();

            builder.Property(x => x.DocumentType)
                .HasColumnName("DocumentType")
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(x => x.CustomerCode)
                .HasColumnName("CustomerCode")
                .HasMaxLength(20);

            builder.Property(x => x.CustomerName)
                .HasColumnName("CustomerName")
                .HasMaxLength(100);

            builder.Property(x => x.SourceWarehouse)
                .HasColumnName("SourceWarehouse")
                .HasMaxLength(20);

            builder.Property(x => x.TargetWarehouse)
                .HasColumnName("TargetWarehouse")
                .HasMaxLength(20);

            builder.Property(x => x.Priority)
                .HasColumnName("Priority")
                .HasDefaultValue(0);

            builder.Property(x => x.YearCode)
                .HasColumnName("YearCode")
                .HasMaxLength(4);

            // BaseHeaderEntity properties
            builder.Property(x => x.PriorityLevel)
                .HasColumnName("PriorityLevel");

            builder.Property(x => x.Type)
                .HasColumnName("Type")
                .HasMaxLength(20);

            builder.Property(x => x.CreatedBy)
                .HasColumnName("CreatedBy")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.CreatedDate)
                .HasColumnName("CreatedDate")
                .IsRequired();

            builder.Property(x => x.UpdatedBy)
                .HasColumnName("UpdatedBy")
                .HasMaxLength(50);

            builder.Property(x => x.UpdatedDate)
                .HasColumnName("UpdatedDate");

            builder.Property(x => x.IsDeleted)
                .HasColumnName("IsDeleted")
                .HasDefaultValue(false);

            builder.Property(x => x.DeletedBy)
                .HasColumnName("DeletedBy")
                .HasMaxLength(50);

            builder.Property(x => x.DeletedDate)
                .HasColumnName("DeletedDate");

            // Indexes
            builder.HasIndex(x => x.DocumentNo)
                .HasDatabaseName("IX_TrHeader_DocumentNo")
                .IsUnique();

            builder.HasIndex(x => x.BranchCode)
                .HasDatabaseName("IX_TrHeader_BranchCode");

            builder.HasIndex(x => x.ProjectCode)
                .HasDatabaseName("IX_TrHeader_ProjectCode");

            builder.HasIndex(x => x.DocumentDate)
                .HasDatabaseName("IX_TrHeader_DocumentDate");

            builder.HasIndex(x => x.CustomerCode)
                .HasDatabaseName("IX_TrHeader_CustomerCode");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrHeader_IsDeleted");

            builder.HasIndex(x => x.YearCode)
                .HasDatabaseName("IX_TrHeader_YearCode");

            // Navigation properties
            builder.HasMany(x => x.Lines)
                .WithOne(x => x.Header)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ImportLines)
                .WithOne(x => x.Header)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_HEADER_RII_USERS_CREATED_BY");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_HEADER_RII_USERS_UPDATED_BY");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_HEADER_RII_USERS_DELETED_BY");
        }
    }
}