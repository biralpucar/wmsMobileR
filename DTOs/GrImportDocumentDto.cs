using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class GrImportDocumentDto
    {
        public long Id { get; set; }
        
        [Required(ErrorMessage = "HeaderId_Required")]
        public long HeaderId { get; set; }
        
        [Required(ErrorMessage = "Base64_Required")]
        public byte[] Base64 { get; set; } = null!;
        
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public long? DeletedBy { get; set; }
        
        // Full user information properties
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }

    }

    public class CreateGrImportDocumentDto
    {
        [Required(ErrorMessage = "HeaderId_Required")]
        public long HeaderId { get; set; }
        
        [Required(ErrorMessage = "Base64_Required")]
        public byte[] Base64 { get; set; } = null!;
    }

    public class UpdateGrImportDocumentDto
    {
        [Required(ErrorMessage = "HeaderId_Required")]
        public long HeaderId { get; set; }
        
        [Required(ErrorMessage = "Base64_Required")]
        public byte[] Base64 { get; set; } = null!;
    }
}
