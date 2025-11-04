using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public class MobilemenuHeaderConfiguration : IEntityTypeConfiguration<MobilemenuHeader>
    {
        public void Configure(EntityTypeBuilder<MobilemenuHeader> builder)
        {
            // Table name
            builder.ToTable("RII_MOBILMENU_HEADER");

            // Primary key
            builder.HasKey(x => x.Id);

            // Properties configuration
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.MenuId)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("MenuId");

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("Title");

            builder.Property(x => x.Icon)
                .HasMaxLength(100)
                .HasColumnName("Icon");

            builder.Property(x => x.IsOpen)
                .HasColumnName("IsOpen");

            // Base entity properties
            builder.Property(x => x.CreatedDate)
                .HasColumnName("CreatedDate");

            builder.Property(x => x.UpdatedDate)
                .HasColumnName("UpdatedDate");

            builder.Property(x => x.DeletedDate)
                .HasColumnName("DeletedDate");

            builder.Property(x => x.IsDeleted)
                .HasColumnName("IsDeleted");

            builder.Property(x => x.CreatedBy)
                .HasColumnName("CreatedBy");

            builder.Property(x => x.UpdatedBy)
                .HasColumnName("UpdatedBy");

            builder.Property(x => x.DeletedBy)
                .HasColumnName("DeletedBy");

            // Relationships
            builder.HasMany(x => x.Lines)
                .WithOne(x => x.Header)
                .HasForeignKey(x => x.HeaderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Foreign key relationships for user tracking
            builder.HasOne(x => x.CreatedByUser)
                .WithMany()
                .HasForeignKey(x => x.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.UpdatedByUser)
                .WithMany()
                .HasForeignKey(x => x.UpdatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DeletedByUser)
                .WithMany()
                .HasForeignKey(x => x.DeletedBy)
                .OnDelete(DeleteBehavior.Restrict);

                builder.HasData(
                new MobilemenuHeader { Id = 1, MenuId = "mal-kabul", Title = "malKabul", Icon = "cube-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 2, MenuId = "sevkiyat", Title = "sevkiyat", Icon = "car-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 3, MenuId = "transfer", Title = "transfer", Icon = "swap-horizontal-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 4, MenuId = "sayim", Title = "sayim", Icon = "calculator-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 5, MenuId = "hucre-takibi", Title = "hucreTakibi", Icon = "grid-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 6, MenuId = "uretim", Title = "uretim", Icon = "construct-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 7, MenuId = "paketleme", Title = "paketleme", Icon = "cube", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 8, MenuId = "sesli-komut", Title = "sesliKomut", Icon = "barcode-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new MobilemenuHeader { Id = 9, MenuId = "genel-bilgi", Title = "genelBilgi", Icon = "information-circle-outline", IsOpen = false, CreatedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
            );

        }
    }
}