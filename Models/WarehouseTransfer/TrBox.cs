using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_ImportLBox")]
    public class TrBox : BaseEntity
    {
        [Required, ForeignKey(nameof(ImportLine))]
        public long ImportLineId { get; set; }
        public virtual TrImportLine ImportLine { get; set; } = null!;

        [Required, MaxLength(30)]
        public string BoxNo { get; set; } = null!;

        [MaxLength(30)]
        public string BoxNumber { get; set; } = string.Empty;

        [MaxLength(30)]
        public string BoxCode { get; set; } = string.Empty;

        [MaxLength(20)]
        public string BoxType { get; set; } = string.Empty;

        public decimal? Quantity { get; set; }

        public decimal? Weight { get; set; }

        public decimal? Volume { get; set; }

        [MaxLength(30)]
        public string? Description1 { get; set; }

        [MaxLength(50)]
        public string? Description2 { get; set; }

        [MaxLength(200)]
        public string Description { get; set; } = string.Empty;

        // Navigation properties
        public virtual ICollection<TrSBox> SBoxes { get; set; } = new List<TrSBox>();
    }
}
