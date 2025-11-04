using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // 📦 Tablonun SQL karşılığı
    [Table("RII_GR_Line")]
    public class GrLine : BaseEntity
    {

        // 🔗 Header tablosuna foreign key (bağlantı)
        [Required, ForeignKey(nameof(GrHeader))]
        public long HeaderId { get; set; }

        // Navigation property — EF Core için ilişkiyi temsil eder
        public virtual GrHeader Header { get; set; } = null!;

        // 🧾 İlgili sipariş kaydının Id’si (varsa)
        public int? OrderId { get; set; }

        // 📊 Satırdaki miktar bilgisi
        [Required, Column(TypeName = "decimal(18,2)")]
        public decimal Quantity { get; set; } = 0;

        // 🏷 ERP tarafındaki ürün kodu
        [Required, StringLength(35)]
        public string ErpProductCode { get; set; } = null!;

        [Required]
        // 📏 Ölçü birimi (örnek: 1 = Adet, 2 = Koli, 3 = Palet vs.)
        public byte? MeasurementUnit { get; set; }

        // 🔢 Ürünün seri numarasıyla mı takip edildiğini belirtir
        [Required]
        public bool IsSerial { get; set; } = false;

        // 🤖 Seri numarası sistem tarafından otomatik mi oluşturulacak?
        [Required]
        public bool AutoSerial { get; set; } = false;

        // 🔄 Miktar seri numaralarına göre mi hesaplanacak?
        [Required]
        public bool QuantityBySerial { get; set; } = false;

        // 🏭 Hedef depo (warehouse) kodu
        public short? TargetWarehouse { get; set; }

        // 📝 Açıklama alanları (opsiyonel)
        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

        [StringLength(100)]
        public string? Description3 { get; set; }

    }
}
