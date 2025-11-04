using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_HEADER")]
    public class TrHeader : BaseHeaderEntity
    {
        [Required, MaxLength(10)]
        public string BranchCode { get; set; } = null!;

        [MaxLength(20)]
        public string? ProjectCode { get; set; }

        [Required, MaxLength(50)]
        public string DocumentNo { get; set; } = null!;

        public DateTime DocumentDate { get; set; }

        [Required, MaxLength(10)]
        public string DocumentType { get; set; } = null!;

        [MaxLength(20)]
        public string? CustomerCode { get; set; }

        [MaxLength(100)]
        public string? CustomerName { get; set; }

        [MaxLength(20)]
        public string? SourceWarehouse { get; set; }

        [MaxLength(20)]
        public string? TargetWarehouse { get; set; }

        [MaxLength(10)]
        public string? Priority { get; set; }

    
        [Required, MaxLength(4)]
        public string YearCode { get; set; } = DateTime.Now.Year.ToString();

        // Açıklamalar
        [MaxLength(50)]
        public string? Description1 { get; set; }

        [MaxLength(100)]
        public string? Description2 { get; set; }

        // Öncelik ve tür
        public byte? PriorityLevel { get; set; }

        [Required]
        public byte Type { get; set; }

        // Navigation properties
        public virtual ICollection<TrLine> Lines { get; set; } = new List<TrLine>();
        public virtual ICollection<TrImportLine> ImportLines { get; set; } = new List<TrImportLine>();
    }
}
