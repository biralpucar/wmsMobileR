using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrRouteConfiguration : IEntityTypeConfiguration<TrRoute>
    {
        public void Configure(EntityTypeBuilder<TrRoute> builder)
        {
            // Table name
            builder.ToTable("RII_TR_ROUTE");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.LineId)
                .HasColumnName("LineId")
                .IsRequired();

            builder.Property(x => x.StockCode)
                .HasColumnName("StockCode")
                .HasMaxLength(35)
                .IsRequired();

            builder.Property(x => x.RouteCode)
                .HasColumnName("RouteCode")
                .HasMaxLength(30);

            builder.Property(x => x.Quantity)
                .HasColumnName("Quantity")
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.SerialNo)
                .HasColumnName("SerialNo")
                .HasMaxLength(50);

            builder.Property(x => x.SerialNo2)
                .HasColumnName("SerialNo2")
                .HasMaxLength(50);

            builder.Property(x => x.SourceWarehouse)
                .HasColumnName("SourceWarehouse");

            builder.Property(x => x.TargetWarehouse)
                .HasColumnName("TargetWarehouse");

            builder.Property(x => x.SourceCellCode)
                .HasColumnName("SourceCellCode")
                .HasMaxLength(20);

            builder.Property(x => x.TargetCellCode)
                .HasColumnName("TargetCellCode")
                .HasMaxLength(20);

            builder.Property(x => x.Priority)
                .HasColumnName("Priority");

            builder.Property(x => x.Description)
                .HasColumnName("Description")
                .HasMaxLength(100);

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
            builder.HasIndex(x => x.LineId)
                .HasDatabaseName("IX_TrRoute_LineId");

            builder.HasIndex(x => x.StockCode)
                .HasDatabaseName("IX_TrRoute_StockCode");

            builder.HasIndex(x => x.SerialNo)
                .HasDatabaseName("IX_TrRoute_SerialNo");

            builder.HasIndex(x => x.SourceWarehouse)
                .HasDatabaseName("IX_TrRoute_SourceWarehouse");

            builder.HasIndex(x => x.TargetWarehouse)
                .HasDatabaseName("IX_TrRoute_TargetWarehouse");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrRoute_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.Line)
                .WithMany(x => x.Routes)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_ROUTE_RII_USERS_CREATED_BY");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_ROUTE_RII_USERS_UPDATED_BY");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_ROUTE_RII_USERS_DELETED_BY");
        }
    }
}