using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class GrHeaderDto
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(10)]
        public string BranchCode { get; set; } = null!;

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        [Required]
        [StringLength(30)]
        public string CustomerCode { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string ERPDocumentNo { get; set; } = null!;

        [Required]
        [StringLength(4)]
        public string DocumentType { get; set; } = null!;

        public DateTime DocumentDate { get; set; }

        [Required]
        [StringLength(4)]
        public string YearCode { get; set; } = null!;

        public bool ReturnCode { get; set; } = false;
        public bool OCRSource { get; set; } = false;
        public bool IsPlanned { get; set; } = false;

        [StringLength(30)]
        public string? Description1 { get; set; }
        
        [StringLength(30)]
        public string? Description2 { get; set; }
        
        [StringLength(50)]
        public string? Description3 { get; set; }
        
        [StringLength(100)]
        public string? Description4 { get; set; }
        
        [StringLength(100)]
        public string? Description5 { get; set; }

        // BaseHeaderEntity properties
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
        
        public string? ERPIntegrationStatus { get; set; }
        public string? ERPErrorMessage { get; set; }

    }

    public class CreateGrHeaderDto
    {
        [Required]
        [StringLength(10)]
        public string BranchCode { get; set; } = null!;

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        [Required]
        [StringLength(30)]
        public string CustomerCode { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string ERPDocumentNo { get; set; } = null!;

        [Required]
        [StringLength(4)]
        public string DocumentType { get; set; } = null!;

        public DateTime DocumentDate { get; set; }

        [Required]
        [StringLength(4)]
        public string YearCode { get; set; } = null!;

        public bool ReturnCode { get; set; } = false;
        public bool OCRSource { get; set; } = false;
        public bool IsPlanned { get; set; } = false;

        [StringLength(30)]
        public string? Description1 { get; set; }
        
        [StringLength(30)]
        public string? Description2 { get; set; }
        
        [StringLength(50)]
        public string? Description3 { get; set; }
        
        [StringLength(100)]
        public string? Description4 { get; set; }
        
        [StringLength(100)]
        public string? Description5 { get; set; }
    }

    public class UpdateGrHeaderDto
    {
        [StringLength(10)]
        public string? BranchCode { get; set; }

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        [StringLength(30)]
        public string? CustomerCode { get; set; }

        [StringLength(20)]
        public string? ERPDocumentNo { get; set; }

        [StringLength(4)]
        public string? DocumentType { get; set; }

        public DateTime? DocumentDate { get; set; }

        [StringLength(4)]
        public string? YearCode { get; set; }

        public bool? ReturnCode { get; set; }
        public bool? OCRSource { get; set; }
        public bool? IsPlanned { get; set; }

        [StringLength(30)]
        public string? Description1 { get; set; }
        
        [StringLength(30)]
        public string? Description2 { get; set; }
        
        [StringLength(50)]
        public string? Description3 { get; set; }
        
        [StringLength(100)]
        public string? Description4 { get; set; }
        
        [StringLength(100)]
        public string? Description5 { get; set; }
    }
}
