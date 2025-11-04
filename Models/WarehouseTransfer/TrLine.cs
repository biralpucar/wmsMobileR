using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_LINE")]
    public class TrLine : BaseEntity
    {
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual TrHeader Header { get; set; } = null!;

        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        public int? OrderId { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [MaxLength(10)]
        public string? Unit { get; set; }

        // ERP fields
        [MaxLength(50)]
        public string? ErpOrderNo { get; set; }

        [MaxLength(10)]
        public string? ErpOrderLineNo { get; set; }

        [MaxLength(10)]
        public string? ErpLineReference { get; set; }

        [MaxLength(100)]
        public string? Description { get; set; }

        // Navigation properties
        public virtual ICollection<TrRoute> Routes { get; set; } = new List<TrRoute>();
        public virtual ICollection<TrImportLine> ImportLines { get; set; } = new List<TrImportLine>();
        public virtual ICollection<TrTerminalLine> TerminalLines { get; set; } = new List<TrTerminalLine>();
    }
}