using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    /// <summary>
    /// GR Import Serial Line DTO - Veri transfer objesi
    /// </summary>
    public class GrImportSerialLineDto
    {
        public long Id { get; set; }
        public long ImportLineId { get; set; }
        public string SerialNumber { get; set; } = null!;
        public decimal Quantity { get; set; }
        public short TargetWarehouse { get; set; }
        public string? TargetCellCode { get; set; }
        public string ScannedBarcode { get; set; } = null!;
        public string? SerialNumber2 { get; set; }
        public string? SerialNumber3 { get; set; }
        public string? SerialNumber4 { get; set; }
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
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

    /// <summary>
    /// GR Import Serial Line oluşturma DTO'su
    /// </summary>
    public class CreateGrImportSerialLineDto
    {
        [Required(ErrorMessage = "ImportLineId alanı zorunludur")]
        public long ImportLineId { get; set; }

        [Required(ErrorMessage = "SerialNumber alanı zorunludur")]
        [StringLength(50, ErrorMessage = "SerialNumber en fazla 50 karakter olabilir")]
        public string SerialNumber { get; set; } = null!;

        [Required(ErrorMessage = "Quantity alanı zorunludur")]
        [Range(0, double.MaxValue, ErrorMessage = "Quantity 0 veya daha büyük olmalıdır")]
        public decimal Quantity { get; set; }

        [Required(ErrorMessage = "TargetWarehouse alanı zorunludur")]
        public short TargetWarehouse { get; set; }

        [StringLength(20, ErrorMessage = "TargetCellCode en fazla 20 karakter olabilir")]
        public string? TargetCellCode { get; set; }

        [Required(ErrorMessage = "ScannedBarcode alanı zorunludur")]
        [StringLength(100, ErrorMessage = "ScannedBarcode en fazla 100 karakter olabilir")]
        public string ScannedBarcode { get; set; } = null!;

        [StringLength(50, ErrorMessage = "SerialNumber2 en fazla 50 karakter olabilir")]
        public string? SerialNumber2 { get; set; }

        [StringLength(50, ErrorMessage = "SerialNumber3 en fazla 50 karakter olabilir")]
        public string? SerialNumber3 { get; set; }

        [StringLength(50, ErrorMessage = "SerialNumber4 en fazla 50 karakter olabilir")]
        public string? SerialNumber4 { get; set; }

        [StringLength(30, ErrorMessage = "Description1 en fazla 30 karakter olabilir")]
        public string? Description1 { get; set; }

        [StringLength(50, ErrorMessage = "Description2 en fazla 50 karakter olabilir")]
        public string? Description2 { get; set; }
    }

    /// <summary>
    /// GR Import Serial Line güncelleme DTO'su
    /// </summary>
    public class UpdateGrImportSerialLineDto
    {
        [Required(ErrorMessage = "ImportLineId alanı zorunludur")]
        public long ImportLineId { get; set; }

        [Required(ErrorMessage = "SerialNumber alanı zorunludur")]
        [StringLength(50, ErrorMessage = "SerialNumber en fazla 50 karakter olabilir")]
        public string SerialNumber { get; set; } = null!;

        [Required(ErrorMessage = "Quantity alanı zorunludur")]
        [Range(0, double.MaxValue, ErrorMessage = "Quantity 0 veya daha büyük olmalıdır")]
        public decimal Quantity { get; set; }

        [Required(ErrorMessage = "TargetWarehouse alanı zorunludur")]
        public short TargetWarehouse { get; set; }

        [StringLength(20, ErrorMessage = "TargetCellCode en fazla 20 karakter olabilir")]
        public string? TargetCellCode { get; set; }

        [Required(ErrorMessage = "ScannedBarcode alanı zorunludur")]
        [StringLength(100, ErrorMessage = "ScannedBarcode en fazla 100 karakter olabilir")]
        public string ScannedBarcode { get; set; } = null!;

        [StringLength(50, ErrorMessage = "SerialNumber2 en fazla 50 karakter olabilir")]
        public string? SerialNumber2 { get; set; }

        [StringLength(50, ErrorMessage = "SerialNumber3 en fazla 50 karakter olabilir")]
        public string? SerialNumber3 { get; set; }

        [StringLength(50, ErrorMessage = "SerialNumber4 en fazla 50 karakter olabilir")]
        public string? SerialNumber4 { get; set; }

        [StringLength(30, ErrorMessage = "Description1 en fazla 30 karakter olabilir")]
        public string? Description1 { get; set; }

        [StringLength(50, ErrorMessage = "Description2 en fazla 50 karakter olabilir")]
        public string? Description2 { get; set; }
    }
}
