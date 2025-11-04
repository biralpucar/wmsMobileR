using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class TrLineDto
    {
        public long Id { get; set; }
        public long HeaderId { get; set; }
        public string StockCode { get; set; } = string.Empty;
        public int? OrderId { get; set; }
        public decimal Quantity { get; set; }
        public string? Unit { get; set; }
        public string? ErpOrderNo { get; set; }
        public string? ErpOrderLineNo { get; set; }
        public string? ErpLineReference { get; set; }
        public string? Description { get; set; }
        
        // User tracking properties
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool IsDeleted { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public long? DeletedBy { get; set; }
        
        // Full user information properties
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }
    }

    public class CreateTrLineDto
    {
        [Required]
        public long HeaderId { get; set; }

        [Required]
        [StringLength(35)]
        public string StockCode { get; set; } = string.Empty;

        public int? OrderId { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [StringLength(10)]
        public string? Unit { get; set; }

        [StringLength(50)]
        public string? ErpOrderNo { get; set; }

        [StringLength(10)]
        public string? ErpOrderLineNo { get; set; }

        [StringLength(10)]
        public string? ErpLineReference { get; set; }

        [StringLength(100)]
        public string? Description { get; set; }
    }

    public class UpdateTrLineDto
    {
        public long? HeaderId { get; set; }

        [StringLength(35)]
        public string? StockCode { get; set; }

        public int? OrderId { get; set; }

        public decimal? Quantity { get; set; }

        [StringLength(10)]
        public string? Unit { get; set; }

        [StringLength(50)]
        public string? ErpOrderNo { get; set; }

        [StringLength(10)]
        public string? ErpOrderLineNo { get; set; }

        [StringLength(10)]
        public string? ErpLineReference { get; set; }

        [StringLength(100)]
        public string? Description { get; set; }
    }
}
