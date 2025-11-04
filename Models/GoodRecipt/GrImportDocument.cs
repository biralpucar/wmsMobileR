using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_GR_ImportDocument")]
    public class GrImportDocument : BaseEntity
    {

        [Required, ForeignKey(nameof(GrHeader))]
        public long HeaderId { get; set; }
        public virtual GrHeader Header { get; set; } = null!;

        [Required]
        public byte[] Base64 { get; set; } = null!;

    }
}
