using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class GrLineConfiguration : IEntityTypeConfiguration<GrLine>
    {
        public void Configure(EntityTypeBuilder<GrLine> builder)
        {
            // Table name
            builder.ToTable("RII_GR_Line");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.HeaderId)
                .IsRequired()
                .HasColumnName("HeaderId");

            builder.Property(x => x.Quantity)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasColumnName("Quantity");

            builder.Property(x => x.ErpProductCode)
                .IsRequired()
                .HasMaxLength(35)
                .HasColumnName("ErpProductCode");

            builder.Property(x => x.MeasurementUnit)
                .HasColumnName("MeasurementUnit");

            builder.Property(x => x.Description1)
                .HasMaxLength(30)
                .HasColumnName("Description1");

            builder.Property(x => x.Description2)
                .HasMaxLength(50)
                .HasColumnName("Description2");

            builder.Property(x => x.Description3)
                .HasMaxLength(100)
                .HasColumnName("Description3");

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

            // Relationships
            builder.HasOne(x => x.Header)
                .WithMany(x => x.Lines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrLine_GrHeader");

            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrLine_CreatedBy");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrLine_UpdatedBy");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_GrLine_DeletedBy");

            // Indexes
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_GrLine_HeaderId");

            builder.HasIndex(x => x.ErpProductCode)
                .HasDatabaseName("IX_GrLine_ErpProductCode");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_GrLine_IsDeleted");

            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_GrLine_HeaderId");

            // Query filter for soft delete
            builder.HasQueryFilter(x => !x.IsDeleted);
        }
    }
}