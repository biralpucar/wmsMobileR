using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class TrTerminalLineConfiguration : IEntityTypeConfiguration<TrTerminalLine>
    {
        public void Configure(EntityTypeBuilder<TrTerminalLine> builder)
        {
            // Table name
            builder.ToTable("RII_TR_TERMINAL_LINE");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.LineId)
                .HasColumnName("LineId")
                .IsRequired();

            builder.Property(x => x.RouteId)
                .HasColumnName("RouteId");

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
                .HasDatabaseName("IX_TrTerminalLine_LineId");

            builder.HasIndex(x => x.RouteId)
                .HasDatabaseName("IX_TrTerminalLine_RouteId");

            builder.HasIndex(x => x.IsDeleted)
                .HasDatabaseName("IX_TrTerminalLine_IsDeleted");

            // Foreign key relationships
            builder.HasOne(x => x.Line)
                .WithMany(x => x.TerminalLines)
                .HasForeignKey(x => x.LineId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Route)
                .WithMany()
                .HasForeignKey(x => x.RouteId)
                .OnDelete(DeleteBehavior.Restrict);

            // User relationships
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_TERMINAL_LINE_RII_USERS_CREATED_BY");

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_TERMINAL_LINE_RII_USERS_UPDATED_BY");

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("FK_RII_TR_TERMINAL_LINE_RII_USERS_DELETED_BY");
        }
    }
}