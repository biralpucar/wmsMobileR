using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_IMPORT_LINE")]
    public class TrImportLine : BaseEntity
    {
        // Header ilişkisi
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual TrHeader Header { get; set; } = null!;

        // Üst işlem (Line)
        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual TrLine Line { get; set; } = null!;

        // Route ilişkisi
        [ForeignKey(nameof(Route))]
        public long? RouteId { get; set; }
        public virtual TrRoute? Route { get; set; }

        // Ürün bilgileri
        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        [MaxLength(50)]
        public string? SerialNo { get; set; }

        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        [MaxLength(50)]
        public string? SerialNo3 { get; set; }

        [MaxLength(50)]
        public string? SerialNo4 { get; set; }

        [Required]
        public decimal Quantity { get; set; } = 0;

        [MaxLength(100)]
        public string? ScannedBarkod { get; set; }

        // ERP bağlantısı (nullable olabilir)
        [MaxLength(50)]
        public string? ErpOrderNumber { get; set; }

        [MaxLength(50)]
        public string? ErpOrderNo { get; set; }

        [MaxLength(10)]
        public string? ErpOrderLineNumber { get; set; }

        [MaxLength(10)]
        public string? ErpOrderSequence { get; set; }

        // Açıklamalar
        [MaxLength(30)]
        public string? Description1 { get; set; }

        [MaxLength(50)]
        public string? Description2 { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }

        // Navigation properties
        public virtual ICollection<TrBox> Boxes { get; set; } = new List<TrBox>();
    }
}