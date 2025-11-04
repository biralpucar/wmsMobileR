using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class GrImportLDto
    {
        public long Id { get; set; }
        
        public long? LineId { get; set; }
        
        [Required]
        public long HeaderId { get; set; }
        
        [Required]
        [StringLength(35)]
        public string StockCode { get; set; } = null!;
        
        [StringLength(30)]
        public string? Description1 { get; set; }
        
        [StringLength(50)]
        public string? Description2 { get; set; }
        
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        
        [StringLength(50)]
        public string? CreatedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public string? DeletedBy { get; set; }
        
        // Full user information properties
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }
    }

    public class CreateGrImportLDto
    {
        public long? LineId { get; set; }
        
        [Required]
        public long HeaderId { get; set; }
        
        [Required]
        [StringLength(35)]
        public string StockCode { get; set; } = null!;
        
        [StringLength(30)]
        public string? Description1 { get; set; }
        
        [StringLength(50)]
        public string? Description2 { get; set; }
        
        [StringLength(50)]
        public string? CreatedBy { get; set; }
    }

    public class UpdateGrImportLDto
    {
        public long? LineId { get; set; }
        
        [Required]
        public long HeaderId { get; set; }
        
        [Required]
        [StringLength(35)]
        public string StockCode { get; set; } = null!;
        
        [StringLength(30)]
        public string? Description1 { get; set; }
        
        [StringLength(50)]
        public string? Description2 { get; set; }
        
        [StringLength(50)]
        public string? UpdatedBy { get; set; }
    }
}
