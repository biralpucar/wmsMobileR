using WMS_WEBAPI.Models;
using WMS_WEBAPI.Repositories;

namespace WMS_WEBAPI.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        // Repository properties
        IUserRepository Users { get; }
        IGenericRepository<User> UserEntities { get; }
        IGenericRepository<BaseEntity> BaseEntities { get; }
        IGenericRepository<BaseHeaderEntity> BaseHeaderEntities { get; }
        
        // GoodReceipt repositories
        IGenericRepository<GrHeader> GrHeaders { get; }
        IGenericRepository<GrLine> GrLines { get; }
        IGenericRepository<GrImportDocument> GrImportDocuments { get; }
        IGenericRepository<GrImportL> GrImportLines { get; }
        IGenericRepository<GrImportSerialLine> GrImportSerialLines { get; }
        
        // User and Authority repositories
        IGenericRepository<UserAuthority> UserAuthorities { get; }
        
        // PlatformSidebar repositories
        IGenericRepository<PlatformPageGroup> PlatformPageGroups { get; }
        IGenericRepository<SidebarmenuHeader> SidebarmenuHeaders { get; }
        IGenericRepository<SidebarmenuLine> SidebarmenuLines { get; }
        IGenericRepository<PlatformUserGroupMatch> PlatformUserGroupMatches { get; }
        
        // MobileSidebar repositories
        IGenericRepository<MobilePageGroup> MobilePageGroups { get; }
        IGenericRepository<MobileUserGroupMatch> MobileUserGroupMatches { get; }
        IGenericRepository<MobilemenuHeader> MobilemenuHeaders { get; }
        IGenericRepository<MobilemenuLine> MobilemenuLines { get; }
        
        // WarehouseTransfer repositories
        IGenericRepository<TrBox> TrBoxes { get; }
        IGenericRepository<TrSBox> TrSBoxes { get; }
        IGenericRepository<TrLine> TrLines { get; }
        IGenericRepository<TrHeader> TrHeaders { get; }
        IGenericRepository<TrRoute> TrRoutes { get; }
        IGenericRepository<TrTerminalLine> TrTerminalLines { get; }
        IGenericRepository<TrImportLine> TrImportLines { get; }
        



        // Methods
        Task<long> SaveChangesAsync();
        long SaveChanges();
    }
}