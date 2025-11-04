using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    public abstract class BaseHeaderEntity : BaseEntity
    {
              
        // Completion Date (specific)
        public DateTime? CompletionDate { get; set; } // kayıt tamamlanma tarihi
        public bool IsCompleted { get; set; } = false;
        

        // Approval Fields (ERP specific)
        public bool IsPendingApproval { get; set; } = false; // Onaya gönderilecek mi? default false
        public bool? ApprovalStatus { get; set; } // Onay durumu (true = Approved, false = Rejected, null = Pending)
        public long? ApprovedByUserId { get; set; } // Onaylayan kullanıcı ID
        public DateTime? ApprovalDate { get; set; } // Onay tarihi
        public bool IsERPIntegrated { get; set; } = false;

        // ERP Integration Fields
        public string? ERPReferenceNumber { get; set; } // ERP referans numarası
        public DateTime? ERPIntegrationDate { get; set; } // ERP entegrasyon tarihi
        public string? ERPIntegrationStatus { get; set; } // ERP entegrasyon durumu
        public string? ERPErrorMessage { get; set; } // ERP hata mesajı (varsa)
    }
}
