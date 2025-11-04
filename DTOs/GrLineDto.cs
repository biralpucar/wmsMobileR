using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    /// <summary>
    /// GR Line DTO - Veri transfer objesi
    /// </summary>
    public class GrLineDto
    {
        public long Id { get; set; }
        public long HeaderId { get; set; }
        public int? OrderId { get; set; }
        public decimal Quantity { get; set; }
        public string ErpProductCode { get; set; } = null!;
        public byte? MeasurementUnit { get; set; }
        public bool IsSerial { get; set; }
        public bool AutoSerial { get; set; }
        public bool QuantityBySerial { get; set; }
        public short? TargetWarehouse { get; set; }
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
        public string? Description3 { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool IsDeleted { get; set; }
        
        // User tracking properties
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public long? DeletedBy { get; set; }
        
        // Full user information properties
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }

    }

    /// <summary>
    /// GR Line oluşturma DTO'su
    /// </summary>
    public class CreateGrLineDto
    {
        [Required(ErrorMessage = "HeaderId alanı zorunludur")]
        public long HeaderId { get; set; }

        public int? OrderId { get; set; }

        [Required(ErrorMessage = "Quantity alanı zorunludur")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Quantity 0'dan büyük olmalıdır")]
        public decimal Quantity { get; set; }

        [Required(ErrorMessage = "ErpProductCode alanı zorunludur")]
        [StringLength(35, ErrorMessage = "ErpProductCode en fazla 35 karakter olabilir")]
        public string ErpProductCode { get; set; } = null!;

        [Required(ErrorMessage = "MeasurementUnit alanı zorunludur")]
        public byte? MeasurementUnit { get; set; }

        public bool IsSerial { get; set; } = false;
        public bool AutoSerial { get; set; } = false;
        public bool QuantityBySerial { get; set; } = false;
        public short? TargetWarehouse { get; set; }

        [StringLength(30, ErrorMessage = "Description1 en fazla 30 karakter olabilir")]
        public string? Description1 { get; set; }

        [StringLength(50, ErrorMessage = "Description2 en fazla 50 karakter olabilir")]
        public string? Description2 { get; set; }

        [StringLength(100, ErrorMessage = "Description3 en fazla 100 karakter olabilir")]
        public string? Description3 { get; set; }
    }

    /// <summary>
    /// GR Line güncelleme DTO'su
    /// </summary>
    public class UpdateGrLineDto
    {
        [Required(ErrorMessage = "HeaderId alanı zorunludur")]
        public long HeaderId { get; set; }

        public int? OrderId { get; set; }

        [Required(ErrorMessage = "Quantity alanı zorunludur")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Quantity 0'dan büyük olmalıdır")]
        public decimal Quantity { get; set; }

        [Required(ErrorMessage = "ErpProductCode alanı zorunludur")]
        [StringLength(35, ErrorMessage = "ErpProductCode en fazla 35 karakter olabilir")]
        public string ErpProductCode { get; set; } = null!;

        [Required(ErrorMessage = "MeasurementUnit alanı zorunludur")]
        public byte? MeasurementUnit { get; set; }

        public bool IsSerial { get; set; } = false;
        public bool AutoSerial { get; set; } = false;
        public bool QuantityBySerial { get; set; } = false;
        public short? TargetWarehouse { get; set; }

        [StringLength(30, ErrorMessage = "Description1 en fazla 30 karakter olabilir")]
        public string? Description1 { get; set; }

        [StringLength(50, ErrorMessage = "Description2 en fazla 50 karakter olabilir")]
        public string? Description2 { get; set; }

        [StringLength(100, ErrorMessage = "Description3 en fazla 100 karakter olabilir")]
        public string? Description3 { get; set; }
    }
}
