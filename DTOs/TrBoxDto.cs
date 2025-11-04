using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class TrBoxDto
    {
        public long Id { get; set; }
        public long ImportLineId { get; set; }
        public string BoxNo { get; set; } = string.Empty;
        public string BoxNumber { get; set; } = string.Empty;
        public string? BoxCode { get; set; }
        public string? BoxType { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Volume { get; set; }
        public string? Description { get; set; }
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public long? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }

        // Full user information properties
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }

    }

    public class CreateTrBoxDto
    {
        [Required]
        public long ImportLineId { get; set; }

        [Required]
        [StringLength(30)]
        public string BoxNo { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string BoxNumber { get; set; } = string.Empty;

        [StringLength(20)]
        public string? BoxCode { get; set; }

        [StringLength(20)]
        public string? BoxType { get; set; }

        public decimal? Quantity { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Volume { get; set; }

        [StringLength(200)]
        public string? Description { get; set; }

        [StringLength(200)]
        public string? Description1 { get; set; }

        [StringLength(200)]
        public string? Description2 { get; set; }
    }

    public class UpdateTrBoxDto
    {
        public long? ImportLineId { get; set; }

        [StringLength(30)]
        public string? BoxNo { get; set; }

        [StringLength(50)]
        public string? BoxNumber { get; set; }

        [StringLength(20)]
        public string? BoxCode { get; set; }

        [StringLength(20)]
        public string? BoxType { get; set; }

        public decimal? Quantity { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Volume { get; set; }

        [StringLength(200)]
        public string? Description { get; set; }

        [StringLength(200)]
        public string? Description1 { get; set; }

        [StringLength(200)]
        public string? Description2 { get; set; }
    }
}
