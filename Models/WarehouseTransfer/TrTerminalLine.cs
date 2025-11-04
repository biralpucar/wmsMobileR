using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_TR_TerminalLine")]
    public class TrTerminalLine : BaseEntity
    {
        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual TrLine Line { get; set; } = null!;

        [ForeignKey(nameof(Route))]
        public long? RouteId { get; set; }
        public virtual TrRoute? Route { get; set; }
    }
}
