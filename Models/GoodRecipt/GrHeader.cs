using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_GR_Header")] // Veritabanındaki tablo adı
    public class GrHeader : BaseHeaderEntity // BaseHeaderEntity’den miras alır
    {
        // 🔸 Temel alanlar
        [Required, StringLength(10)]
        public string BranchCode { get; set; } = null!; // Şube kodu

        [StringLength(20)]
        public string? ProjectCode { get; set; } // Proje kodu (opsiyonel)

        [Required, StringLength(30)]
        public string CustomerCode { get; set; } = null!; // Müşteri kodu

        [Required, StringLength(20)]
        public string ERPDocumentNo { get; set; } = null!; // ERP belge numarası

        [Required, StringLength(4)]
        public string DocumentType { get; set; } = null!; // Belge tipi (ör: GR, GI, INV vs.)

        [Column(TypeName = "date")]
        public DateTime DocumentDate { get; set; } // Belge tarihi


        [Required, StringLength(4)]
        public string YearCode { get; set; } = null!; // Yıl kodu (ör: 2025)

        // 🔸 Ek özellikler
        public bool ReturnCode { get; set; } = false; // İade işlemi mi?
        public bool OCRSource { get; set; } = false; // OCR’dan mı geldi?
        public bool IsPlanned { get; set; } = false; // Planlı giriş mi?

        // 🔸 Açıklama alanları
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

        // 🔗 İlişkiler (Navigation Properties)
        public virtual ICollection<GrLine> Lines { get; set; } = new List<GrLine>(); // Detay satırları
        public virtual ICollection<GrImportL> ImportLines { get; set; } = new List<GrImportL>(); // İthalat satır detayları
        //public virtual ICollection<RII_GR_ImportDocument> ImportDocuments { get; set; } = new List<RII_GR_ImportDocument>(); // İthalat belgeleri
    }
}
