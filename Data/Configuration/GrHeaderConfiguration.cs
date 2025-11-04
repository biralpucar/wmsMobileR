using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrHeaderConfiguration : IEntityTypeConfiguration<GrHeader>
    {
        public void Configure(EntityTypeBuilder<GrHeader> builder)
        {
            // Table name
            builder.ToTable("RII_GR_Header");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.BranchCode)
                .IsRequired()
                .HasMaxLength(10)
                .HasColumnName("BranchCode");

            builder.Property(x => x.ProjectCode)
                .HasMaxLength(20)
                .HasColumnName("ProjectCode");

            builder.Property(x => x.CustomerCode)
                .IsRequired()
                .HasMaxLength(30)
                .HasColumnName("CustomerCode");

            builder.Property(x => x.ERPDocumentNo)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("ERPDocumentNo");

            builder.Property(x => x.DocumentType)
                .IsRequired()
                .HasMaxLength(4)
                .HasColumnName("DocumentType");

            builder.Property(x => x.DocumentDate)
                .HasColumnType("date")
                .HasColumnName("DocumentDate");

            builder.Property(x => x.YearCode)
                .IsRequired()
                .HasMaxLength(4)
                .HasColumnName("YearCode");

            builder.Property(x => x.ReturnCode)
                .HasDefaultValue(false)
                .HasColumnName("ReturnCode");

            builder.Property(x => x.OCRSource)
                .HasDefaultValue(false)
                .HasColumnName("OCRSource");

            builder.Property(x => x.IsPlanned)
                .HasDefaultValue(false)
                .HasColumnName("IsPlanned");

            builder.Property(x => x.Description1)
                .HasMaxLength(30)
                .HasColumnName("Description1");

            builder.Property(x => x.Description2)
                .HasMaxLength(30)
                .HasColumnName("Description2");

            builder.Property(x => x.Description3)
                .HasMaxLength(50)
                .HasColumnName("Description3");

            builder.Property(x => x.Description4)
                .HasMaxLength(100)
                .HasColumnName("Description4");

            builder.Property(x => x.Description5)
                .HasMaxLength(100)
                .HasColumnName("Description5");

            // BaseHeaderEntity properties
            builder.Property(x => x.CreatedDate)
                .IsRequired()
                .HasColumnName("CreatedDate")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(x => x.UpdatedDate)
                .HasColumnName("UpdatedDate");

            // Indexes
            builder.HasIndex(x => x.ERPDocumentNo)
                .IsUnique()
                .HasDatabaseName("IX_GrHeader_ERPDocumentNo");

            builder.HasIndex(x => x.BranchCode)
                .HasDatabaseName("IX_GrHeader_BranchCode");

            builder.HasIndex(x => x.CustomerCode)
                .HasDatabaseName("IX_GrHeader_CustomerCode");

            builder.HasIndex(x => x.DocumentDate)
                .HasDatabaseName("IX_GrHeader_DocumentDate");

            // Composite indexes
            builder.HasIndex(x => new { x.BranchCode, x.DocumentDate })
                .HasDatabaseName("IX_GrHeader_BranchCode_DocumentDate");

            builder.HasIndex(x => new { x.CustomerCode, x.DocumentDate })
                .HasDatabaseName("IX_GrHeader_CustomerCode_DocumentDate");
        }
    }
}