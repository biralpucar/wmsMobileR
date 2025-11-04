using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrImportLineConfiguration : IEntityTypeConfiguration<TrImportLine>
    {
        public void Configure(EntityTypeBuilder<TrImportLine> builder)
        {
            // Table name
            builder.ToTable("RII_TR_IMPORT_LINE");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.HeaderId)
                .HasColumnName("HeaderId")
                .IsRequired();

            builder.Property(x => x.LineId)
                .HasColumnName("LineId")
                .IsRequired();

            builder.Property(x => x.RouteId)
                .HasColumnName("RouteId");

            builder.Property(x => x.StockCode)
                .HasColumnName("StockCode")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.SerialNo)
                .HasColumnName("SerialNo")
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderNo)
                .HasColumnName("ErpOrderNo")
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderNumber)
                .HasColumnName("ErpOrderNumber")
                .HasMaxLength(50);

            builder.Property(x => x.Description)
                .HasColumnName("Description")
                .HasMaxLength(200);

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
            builder.HasIndex(x => x.HeaderId)
                .HasDatabaseName("IX_TrImportLine_HeaderId");

            builder.HasIndex(x => x.LineId)
                .HasDatabaseName("IX_TrImportLine_LineId");

            builder.HasIndex(x => x.RouteId)
                .HasDatabaseName("IX_TrImportLine_RouteId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_TrImportLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_TrImportLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrImportLine_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.Header)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Line)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Route)
                .WithMany(x => x.ImportLines)
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.SetNull);

            // Navigation properties
            builder.HasMany(x => x.Boxes)
                .WithOne(x => x.ImportLine)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_IMPORT_LINE_RII_USERS_CREATED_BY");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_IMPORT_LINE_RII_USERS_UPDATED_BY");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_IMPORT_LINE_RII_USERS_DELETED_BY");
        }
    }
}