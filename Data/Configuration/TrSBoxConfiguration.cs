using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrSBoxConfiguration : IEntityTypeConfiguration<TrSBox>
    {
        public void Configure(EntityTypeBuilder<TrSBox> builder)
        {
            // Table name
            builder.ToTable("RII_TR_SBOX");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.ImportLineId)
                .HasColumnName("ImportLineId")
                .IsRequired();

            builder.Property(x => x.BoxId)
                .HasColumnName("BoxId")
                .IsRequired();

            builder.Property(x => x.SerialNumber)
                .HasColumnName("SerialNumber")
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
            builder.HasIndex(x => x.ImportLineId)
                .HasDatabaseName("IX_TrSBox_ImportLineId");

            builder.HasIndex(x => x.BoxId)
                .HasDatabaseName("IX_TrSBox_BoxId");

            builder.HasIndex(x => x.SerialNumber)
                .HasDatabaseName("IX_TrSBox_SerialNo");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrSBox_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.ImportLine)
                .WithMany()
                .HasForeignKey(x => x.ImportLineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Box)
                .WithMany(x => x.SBoxes)
                .HasForeignKey(x => x.BoxId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_SBOX_RII_USERS_CREATED_BY");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_SBOX_RII_USERS_UPDATED_BY");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_SBOX_RII_USERS_DELETED_BY");
        }
    }
}