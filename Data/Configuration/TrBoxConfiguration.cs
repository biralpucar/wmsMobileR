using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrBoxConfiguration : IEntityTypeConfiguration<TrBox>
    {
        public void Configure(EntityTypeBuilder<TrBox> builder)
        {
            // Table name
            builder.ToTable("RII_TR_BOX");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.ImportLineId)
                .HasColumnName("ImportLineId")
                .IsRequired();

            builder.Property(x => x.BoxType)
                .HasColumnName("BoxType")
                .HasMaxLength(10)
                .IsRequired();

            builder.Property(x => x.Quantity)
                .HasColumnName("Quantity")
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(x => x.Weight)
                .HasColumnName("Weight")
                .HasColumnType("decimal(18,4)");

            builder.Property(x => x.Volume)
                .HasColumnName("Volume")
                .HasColumnType("decimal(18,4)");

            builder.Property(x => x.Description1)
                .HasColumnName("Description1")
                .HasMaxLength(100);

            builder.Property(x => x.Description2)
                .HasColumnName("Description2")
                .HasMaxLength(100);

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
            builder.HasIndex(x => x.ImportLineId)
                .HasDatabaseName("IX_TrBox_ImportLineId");

            builder.HasIndex(x => x.BoxNo)
                .HasDatabaseName("IX_TrBox_BoxNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrBox_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.ImportLine)
                .WithMany(x => x.Boxes)
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);

            // Navigation properties
            builder.HasMany(x => x.SBoxes)
                .WithOne(x => x.Box)
                .HasForeignKey(x => x.BoxId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_BOX_RII_USERS_CREATED_BY");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_BOX_RII_USERS_UPDATED_BY");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_BOX_RII_USERS_DELETED_BY");
        }
    }
}