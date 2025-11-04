using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class TrSBoxDto
    {
        public long Id { get; set; }
        public long ImportLineId { get; set; }
        public long BoxId { get; set; }
        public string SerialNumber { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Location { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Volume { get; set; }
        public string? Dimensions { get; set; }
        public DateTime? PackedDate { get; set; }
        public string? PackedBy { get; set; }
        public DateTime? UnpackedDate { get; set; }
        public string? UnpackedBy { get; set; }
        public string? QualityStatus { get; set; }
        public string? QualityNotes { get; set; }
        public string? DamageStatus { get; set; }
        public string? DamageNotes { get; set; }
        public string? TrackingNumber { get; set; }
        public string? BarcodeNumber { get; set; }
        public string? RfidTag { get; set; }
        public decimal? Temperature { get; set; }
        public decimal? Humidity { get; set; }
        public string? EnvironmentalConditions { get; set; }
        public string? HandlingInstructions { get; set; }
        public string? SpecialRequirements { get; set; }
        public string? Notes { get; set; }
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

    public class CreateTrSBoxDto
    {
        [Required]
        public long ImportLineId { get; set; }

        [Required]
        public long BoxId { get; set; }

        [Required]
        [StringLength(50)]
        public string SerialNumber { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Description { get; set; }

        [Required]
        [StringLength(20)]
        public string Status { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Location { get; set; }

        public decimal? Weight { get; set; }
        public decimal? Volume { get; set; }

        [StringLength(50)]
        public string? Dimensions { get; set; }

        public DateTime? PackedDate { get; set; }

        [StringLength(50)]
        public string? PackedBy { get; set; }

        public DateTime? UnpackedDate { get; set; }

        [StringLength(50)]
        public string? UnpackedBy { get; set; }

        [StringLength(20)]
        public string? QualityStatus { get; set; }

        [StringLength(500)]
        public string? QualityNotes { get; set; }

        [StringLength(20)]
        public string? DamageStatus { get; set; }

        [StringLength(500)]
        public string? DamageNotes { get; set; }

        [StringLength(50)]
        public string? TrackingNumber { get; set; }

        [StringLength(50)]
        public string? BarcodeNumber { get; set; }

        [StringLength(50)]
        public string? RfidTag { get; set; }

        public decimal? Temperature { get; set; }
        public decimal? Humidity { get; set; }

        [StringLength(200)]
        public string? EnvironmentalConditions { get; set; }

        [StringLength(500)]
        public string? HandlingInstructions { get; set; }

        [StringLength(500)]
        public string? SpecialRequirements { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }
    }

    public class UpdateTrSBoxDto
    {
        public long? ImportLineId { get; set; }
        public long? BoxId { get; set; }

        [StringLength(50)]
        public string? SerialNumber { get; set; }

        [StringLength(200)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(50)]
        public string? Location { get; set; }

        public decimal? Weight { get; set; }
        public decimal? Volume { get; set; }

        [StringLength(50)]
        public string? Dimensions { get; set; }

        public DateTime? PackedDate { get; set; }

        [StringLength(50)]
        public string? PackedBy { get; set; }

        public DateTime? UnpackedDate { get; set; }

        [StringLength(50)]
        public string? UnpackedBy { get; set; }

        [StringLength(20)]
        public string? QualityStatus { get; set; }

        [StringLength(500)]
        public string? QualityNotes { get; set; }

        [StringLength(20)]
        public string? DamageStatus { get; set; }

        [StringLength(500)]
        public string? DamageNotes { get; set; }

        [StringLength(50)]
        public string? TrackingNumber { get; set; }

        [StringLength(50)]
        public string? BarcodeNumber { get; set; }

        [StringLength(50)]
        public string? RfidTag { get; set; }

        public decimal? Temperature { get; set; }
        public decimal? Humidity { get; set; }

        [StringLength(200)]
        public string? EnvironmentalConditions { get; set; }

        [StringLength(500)]
        public string? HandlingInstructions { get; set; }

        [StringLength(500)]
        public string? SpecialRequirements { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }
    }
}
