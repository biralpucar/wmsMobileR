using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data.Configuration;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data
{
    public class WmsDbContext : DbContext
    {
        public WmsDbContext(DbContextOptions<WmsDbContext> options) : base(options) { }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserSession> UserSessions { get; set; }
        public DbSet<GrHeader> GrHeaders { get; set; }
        public DbSet<GrLine> GrLines { get; set; }
        public DbSet<GrImportDocument> GrImportDocuments { get; set; }
        public DbSet<GrImportL> GrImportLines { get; set; }
        public DbSet<GrImportSerialLine> GrImportSerialLines { get; set; }
        public DbSet<UserAuthority> UserAuthorities { get; set; }
        
        // MobileSidebar DbSets
        public DbSet<MobilePageGroup> MobilePageGroups { get; set; }
        public DbSet<MobileUserGroupMatch> MobileUserGroupMatches { get; set; }
        public DbSet<MobilemenuHeader> MobilemenuHeaders { get; set; }
        public DbSet<MobilemenuLine> MobilemenuLines { get; set; }
        
        // PlatformSidebar DbSets
        public DbSet<PlatformPageGroup> PlatformPageGroups { get; set; }
        public DbSet<PlatformUserGroupMatch> PlatformUserGroupMatches { get; set; }
        public DbSet<SidebarmenuHeader> SidebarmenuHeaders { get; set; }
        public DbSet<SidebarmenuLine> SidebarmenuLines { get; set; }
        
        // WarehouseTransfer DbSets
        public DbSet<TrBox> TrBoxes { get; set; }
        public DbSet<TrHeader> TrHeaders { get; set; }
        public DbSet<TrImportLine> TrImportLines { get; set; }
        public DbSet<TrLine> TrLines { get; set; }
        public DbSet<TrRoute> TrRoutes { get; set; }
        public DbSet<TrSBox> TrSBoxes { get; set; }
        public DbSet<TrTerminalLine> TrTerminalLines { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply configurations
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserSessionConfiguration());
            modelBuilder.ApplyConfiguration(new GrHeaderConfiguration());
            modelBuilder.ApplyConfiguration(new GrLineConfiguration());
            modelBuilder.ApplyConfiguration(new GrImportDocumentConfiguration());
            modelBuilder.ApplyConfiguration(new GrImportLConfiguration());
            modelBuilder.ApplyConfiguration(new GrImportSerialLineConfiguration());
            modelBuilder.ApplyConfiguration(new UserAuthorityConfiguration());

            // Apply MobileSidebar configurations
            modelBuilder.ApplyConfiguration(new MobilePageGroupConfiguration());
            modelBuilder.ApplyConfiguration(new MobileUserGroupMatchConfiguration());
            modelBuilder.ApplyConfiguration(new MobilemenuHeaderConfiguration());
            modelBuilder.ApplyConfiguration(new MobilemenuLineConfiguration());
            
            // Apply PlatformSidebar configurations
            modelBuilder.ApplyConfiguration(new PlatformPageGroupConfiguration());
            modelBuilder.ApplyConfiguration(new PlatformUserGroupMatchConfiguration());
            modelBuilder.ApplyConfiguration(new SidebarmenuHeaderConfiguration());
            modelBuilder.ApplyConfiguration(new SidebarmenuLineConfiguration());
            
            // Apply WarehouseTransfer configurations
            modelBuilder.ApplyConfiguration(new TrBoxConfiguration());
            modelBuilder.ApplyConfiguration(new TrHeaderConfiguration());
            modelBuilder.ApplyConfiguration(new TrImportLineConfiguration());
            modelBuilder.ApplyConfiguration(new TrLineConfiguration());
            modelBuilder.ApplyConfiguration(new TrRouteConfiguration());
            modelBuilder.ApplyConfiguration(new TrSBoxConfiguration());
            modelBuilder.ApplyConfiguration(new TrTerminalLineConfiguration());
                        
            // GoodReciptFunctions - Function olduğu için HasNoKey kullanıyoruz
            modelBuilder.Entity<FN_GoodsOpenOrders_Header>().HasNoKey().ToFunction("RII_FN_GoodsOpenOrders_Header");
            modelBuilder.Entity<FN_GoodsOpenOrders_Line>().HasNoKey().ToFunction("RII_FN_GoodsOpenOrders_Line");
            
            // TRFunctions - Function olduğu için HasNoKey kullanıyoruz
            modelBuilder.Entity<FN_TransferOpenOrder_Header>().HasNoKey().ToFunction("RII_FN_TransferOpenOrder_Header");
            modelBuilder.Entity<FN_TransferOpenOrder_Line>().HasNoKey().ToFunction("RII_FN_TransferOpenOrder_Line");
        }
    }
}