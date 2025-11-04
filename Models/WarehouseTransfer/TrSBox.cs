using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_ImportLSBox")]
    public class TrSBox : BaseEntity
    {
        [Required, ForeignKey(nameof(ImportLine))]
        public long ImportLineId { get; set; }
        public virtual TrImportLine ImportLine { get; set; } = null!;

        [Required, ForeignKey(nameof(Box))]
        public long BoxId { get; set; }
        public virtual TrBox Box { get; set; } = null!;

        [Required, MaxLength(30)]
        public string BoxNo { get; set; } = null!;

        [MaxLength(30)]
        public string BoxCode { get; set; } = string.Empty;

        [MaxLength(50)]
        public string SerialNumber { get; set; } = string.Empty;

        [MaxLength(35)]
        public string StockCode { get; set; } = string.Empty;


        [MaxLength(200)]
        public string Description { get; set; } = string.Empty;

        [MaxLength(30)]
        public string? Description1 { get; set; }

        [MaxLength(50)]
        public string? Description2 { get; set; }
    }
}
