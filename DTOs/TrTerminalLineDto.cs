using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class TrTerminalLineDto
    {
        public long Id { get; set; }
        public long LineId { get; set; }
        public long? RouteId { get; set; }
        public long UserId { get; set; }
        public string? TerminalCode { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? CompletedDate { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public long? DeletedBy { get; set; }
        
        // Full user information properties
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }

    }

    public class CreateTrTerminalLineDto
    {
        [Required]
        public long LineId { get; set; }

        public long? RouteId { get; set; }

        [Required]
        public long UserId { get; set; }

        [StringLength(50)]
        public string? TerminalCode { get; set; }

        public DateTime? AssignedDate { get; set; }

        public DateTime? CompletedDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(100)]
        public string? Notes { get; set; }
    }

    public class UpdateTrTerminalLineDto
    {
        public long? LineId { get; set; }
        public long? RouteId { get; set; }
        public long? UserId { get; set; }

        [StringLength(50)]
        public string? TerminalCode { get; set; }

        public DateTime? AssignedDate { get; set; }
        public DateTime? CompletedDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(100)]
        public string? Notes { get; set; }
    }
}
