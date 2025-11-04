using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.Repositories;

namespace WMS_WEBAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WmsDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private bool _disposed = false;

        // Repository instances
        private IUserRepository? _users;
        private IGenericRepository<User>? _userEntities;
        private IGenericRepository<BaseEntity>? _baseEntities;
        private IGenericRepository<BaseHeaderEntity>? _baseHeaderEntities;
        
        // GoodReceipt repository instances
        private IGenericRepository<GrHeader>? _grHeaders;
        private IGenericRepository<GrLine>? _grLines;
        private IGenericRepository<GrImportDocument>? _grImportDocuments;
        private IGenericRepository<GrImportL>? _grImportLines;
        private IGenericRepository<GrImportSerialLine>? _grImportSerialLines;
        
        // User and Authority repository instances
        private IGenericRepository<UserAuthority>? _userAuthorities;
        
        // PlatformSidebar repository instances
        private IGenericRepository<PlatformPageGroup>? _platformPageGroups;
        private IGenericRepository<SidebarmenuHeader>? _sidebarmenuHeaders;
        private IGenericRepository<SidebarmenuLine>? _sidebarmenuLines;
        private IGenericRepository<PlatformUserGroupMatch>? _platformUserGroupMatches;
        
        // MobileSidebar repository instances
        private IGenericRepository<MobilePageGroup>? _mobilePageGroups;
        private IGenericRepository<MobileUserGroupMatch>? _mobileUserGroupMatches;
        private IGenericRepository<MobilemenuHeader>? _mobilemenuHeaders;
        private IGenericRepository<MobilemenuLine>? _mobilemenuLines;
        
        // WarehouseTransfer repository instances
        private IGenericRepository<TrBox>? _trBoxes;
        private IGenericRepository<TrSBox>? _trSBoxes;
        private IGenericRepository<TrLine>? _trLines;
        private IGenericRepository<TrHeader>? _trHeaders;
        private IGenericRepository<TrRoute>? _trRoutes;
        private IGenericRepository<TrTerminalLine>? _trTerminalLines;
        private IGenericRepository<TrImportLine>? _trImportLines;

        public UnitOfWork(WmsDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // Repository properties
        public IUserRepository Users =>
            _users ??= new UserRepository(_context);

        public IGenericRepository<User> UserEntities =>
            _userEntities ??= new GenericRepository<User>(_context, _httpContextAccessor);

        public IGenericRepository<BaseEntity> BaseEntities =>
            _baseEntities ??= new GenericRepository<BaseEntity>(_context, _httpContextAccessor);

        public IGenericRepository<BaseHeaderEntity> BaseHeaderEntities =>
            _baseHeaderEntities ??= new GenericRepository<BaseHeaderEntity>(_context, _httpContextAccessor);

        // GoodReceipt repository properties
        public IGenericRepository<GrHeader> GrHeaders =>
            _grHeaders ??= new GenericRepository<GrHeader>(_context, _httpContextAccessor);

        public IGenericRepository<GrLine> GrLines =>
            _grLines ??= new GenericRepository<GrLine>(_context, _httpContextAccessor);

        public IGenericRepository<GrImportDocument> GrImportDocuments =>
            _grImportDocuments ??= new GenericRepository<GrImportDocument>(_context, _httpContextAccessor);

        public IGenericRepository<GrImportL> GrImportLines =>
            _grImportLines ??= new GenericRepository<GrImportL>(_context, _httpContextAccessor);

        public IGenericRepository<GrImportSerialLine> GrImportSerialLines =>
            _grImportSerialLines ??= new GenericRepository<GrImportSerialLine>(_context, _httpContextAccessor);

        // User and Authority repository properties
        public IGenericRepository<UserAuthority> UserAuthorities =>
            _userAuthorities ??= new GenericRepository<UserAuthority>(_context, _httpContextAccessor);

        // PlatformSidebar repository properties
        public IGenericRepository<PlatformPageGroup> PlatformPageGroups =>
            _platformPageGroups ??= new GenericRepository<PlatformPageGroup>(_context, _httpContextAccessor);

        public IGenericRepository<SidebarmenuHeader> SidebarmenuHeaders =>
            _sidebarmenuHeaders ??= new GenericRepository<SidebarmenuHeader>(_context, _httpContextAccessor);

        public IGenericRepository<SidebarmenuLine> SidebarmenuLines =>
            _sidebarmenuLines ??= new GenericRepository<SidebarmenuLine>(_context, _httpContextAccessor);

        public IGenericRepository<PlatformUserGroupMatch> PlatformUserGroupMatches =>
            _platformUserGroupMatches ??= new GenericRepository<PlatformUserGroupMatch>(_context, _httpContextAccessor);

        // MobileSidebar repository properties
        public IGenericRepository<MobilePageGroup> MobilePageGroups =>
            _mobilePageGroups ??= new GenericRepository<MobilePageGroup>(_context, _httpContextAccessor);

        public IGenericRepository<MobileUserGroupMatch> MobileUserGroupMatches =>
            _mobileUserGroupMatches ??= new GenericRepository<MobileUserGroupMatch>(_context, _httpContextAccessor);

        public IGenericRepository<MobilemenuHeader> MobilemenuHeaders =>
            _mobilemenuHeaders ??= new GenericRepository<MobilemenuHeader>(_context, _httpContextAccessor);

        public IGenericRepository<MobilemenuLine> MobilemenuLines =>
            _mobilemenuLines ??= new GenericRepository<MobilemenuLine>(_context, _httpContextAccessor);

        // WarehouseTransfer repository properties
        public IGenericRepository<TrBox> TrBoxes =>
            _trBoxes ??= new GenericRepository<TrBox>(_context, _httpContextAccessor);

        public IGenericRepository<TrSBox> TrSBoxes =>
            _trSBoxes ??= new GenericRepository<TrSBox>(_context, _httpContextAccessor);

        public IGenericRepository<TrLine> TrLines =>
            _trLines ??= new GenericRepository<TrLine>(_context, _httpContextAccessor);

        public IGenericRepository<TrHeader> TrHeaders =>
            _trHeaders ??= new GenericRepository<TrHeader>(_context, _httpContextAccessor);

        public IGenericRepository<TrRoute> TrRoutes =>
            _trRoutes ??= new GenericRepository<TrRoute>(_context, _httpContextAccessor);

        public IGenericRepository<TrTerminalLine> TrTerminalLines =>
            _trTerminalLines ??= new GenericRepository<TrTerminalLine>(_context, _httpContextAccessor);

        public IGenericRepository<TrImportLine> TrImportLines =>
            _trImportLines ??= new GenericRepository<TrImportLine>(_context, _httpContextAccessor);

        public async Task<long> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public long SaveChanges()
        {
            return _context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}