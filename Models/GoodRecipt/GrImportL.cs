using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Models
{
    [Table("RII_GR_ImportL")]
    public class GrImportL : BaseEntity
    {
        [ForeignKey(nameof(Line))]
        public long? LineId { get; set; }
        public virtual GrLine? Line { get; set; }

        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual GrHeader Header { get; set; } = null!;

        [Required, StringLength(35)]
        public string StockCode { get; set; } = null!;

        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

        public virtual ICollection<GrImportSerialLine> SerialLines { get; set; } = new List<GrImportSerialLine>();
    }
}
