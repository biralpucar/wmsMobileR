using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_ROUTE")]
    public class TrRoute : BaseEntity
    {
       [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual TrLine Line { get; set; } = null!;

        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        [MaxLength(30)]
        public string RouteCode { get; set; } = string.Empty;

        [Required]
        public decimal Quantity { get; set; }

        // Seri bilgileri (isteğe bağlı, kalabilir veya kaldırılabilir)
        [MaxLength(50)]
        public string? SerialNo { get; set; }
        
        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        // Location details
        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [MaxLength(20)]
        public string? SourceCellCode { get; set; }

        [MaxLength(20)]
        public string? TargetCellCode { get; set; }

        public int Priority { get; set; } = 0;

        [MaxLength(100)]
        public string? Description { get; set; }

        // Navigation properties
        public virtual ICollection<TrImportLine> ImportLines { get; set; } = new List<TrImportLine>();
    }
}