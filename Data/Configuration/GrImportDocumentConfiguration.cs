using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrImportDocumentConfiguration : IEntityTypeConfiguration<GrImportDocument>
    {
        public void Configure(EntityTypeBuilder<GrImportDocument> builder)
        {
            // Table name
            builder.ToTable("RII_GR_ImportDocument");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.HeaderId)
                .IsRequired()
                .HasColumnName("HeaderId");

            builder.Property(x => x.Base64)
                .IsRequired()
                .HasColumnName("Base64");

            // BaseEntity properties
            builder.Property(x => x.CreatedDate)
                .IsRequired()
                .HasColumnName("CreatedDate")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(x => x.UpdatedDate)
                .HasColumnName("UpdatedDate");

            builder.Property(x => x.DeletedDate)
                .HasColumnName("DeletedDate");

            builder.Property(x => x.IsDeleted)
                .HasDefaultValue(false)
                .HasColumnName("IsDeleted");

            builder.Property(x => x.CreatedBy)
                .HasColumnName("CreatedBy");

            builder.Property(x => x.UpdatedBy)
                .HasColumnName("UpdatedBy");

            builder.Property(x => x.DeletedBy)
                .HasColumnName("DeletedBy");

            // Foreign key relationships
            builder.HasOne(x => x.Header)
                .WithMany()
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrImportDocument_GrHeader");

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_GrImportDocument_HeaderId");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_GrImportDocument_IsDeleted");

            // Query filter for soft delete
            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}