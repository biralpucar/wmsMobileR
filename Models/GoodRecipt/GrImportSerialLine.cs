using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Models
{
    [Table("RII_GR_ImportSerialLine")]
    public class GrImportSerialLine : BaseEntity
    {

        [Required, ForeignKey(nameof(ImportLineId))]
        public long ImportLineId { get; set; }
        public virtual GrImportL ImportLine { get; set; } = null!;

        [Required, StringLength(50)]
        public string SerialNumber { get; set; } = null!;

        [Required, Column(TypeName = "decimal(18,6)")]
        public decimal Quantity { get; set; } = 0;

        [Required]
        public short TargetWarehouse { get; set; }

        [StringLength(20)]
        public string? TargetCellCode { get; set; }

        [Required, StringLength(100)]
        public string ScannedBarcode { get; set; } = null!;

        [StringLength(50)]
        public string? SerialNumber2 { get; set; }

        [StringLength(50)]
        public string? SerialNumber3 { get; set; }

        [StringLength(50)]
        public string? SerialNumber4 { get; set; }

        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

    }
}
