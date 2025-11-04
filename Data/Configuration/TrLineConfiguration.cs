using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrLineConfiguration : IEntityTypeConfiguration<TrLine>
    {
        public void Configure(EntityTypeBuilder<TrLine> builder)
        {
            // Table name
            builder.ToTable("RII_TR_LINE");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.HeaderId)
                .HasColumnName("HeaderId")
                .IsRequired();

            builder.Property(x => x.StockCode)
                .HasColumnName("StockCode")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(x => x.OrderId)
                .HasColumnName("OrderId");

            builder.Property(x => x.Quantity)
                .HasColumnName("Quantity")
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.Unit)
                .HasColumnName("Unit")
                .HasMaxLength(10);

            builder.Property(x => x.ErpOrderNo)
                .HasColumnName("ErpOrderNo")
                .HasMaxLength(50);

            builder.Property(x => x.ErpOrderLineNo)
                .HasColumnName("ErpOrderLineNo")
                .HasMaxLength(10);

            builder.Property(x => x.ErpLineReference)
                .HasColumnName("ErpLineReference")
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
                .HasDatabaseName("IX_TrLine_HeaderId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_TrLine_StockCode");

            builder.HasIndex(x => x.ErpOrderNo)
                .HasDatabaseName("IX_TrLine_ErpOrderNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrLine_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.Header)
                .WithMany()
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_TrLine_CreatedBy");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_TrLine_UpdatedBy");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_TrLine_DeletedBy");

            // Navigation properties
            builder.HasMany(x => x.Routes)
                .WithOne()
                .HasForeignKey("LineId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.ImportLines)
                .WithOne()
                .HasForeignKey("LineId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.TerminalLines)
                .WithOne()
                .HasForeignKey("LineId")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}