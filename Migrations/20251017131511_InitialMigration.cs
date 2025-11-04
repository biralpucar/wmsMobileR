using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WMS_WEBAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlatformPageGroup",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    GroupCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MenuHeaderId = table.Column<long>(type: "bigint", nullable: false),
                    MenuLineId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlatformPageGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlatformUserGroupMatch",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    GroupCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    GroupsId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlatformUserGroupMatch", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlatformUserGroupMatch_PlatformPageGroup_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "PlatformPageGroup",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RII_GR_Header",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ProjectCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CustomerCode = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    ERPDocumentNo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    DocumentType = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    DocumentDate = table.Column<DateTime>(type: "date", nullable: false),
                    YearCode = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    ReturnCode = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    OCRSource = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    IsPlanned = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    Description1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description4 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description5 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true),
                    CompletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    IsPendingApproval = table.Column<bool>(type: "bit", nullable: false),
                    ApprovalStatus = table.Column<bool>(type: "bit", nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsERPIntegrated = table.Column<bool>(type: "bit", nullable: false),
                    ERPReferenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ERPIntegrationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ERPIntegrationStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ERPErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_GR_Header", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_GR_ImportDocument",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    Base64 = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_GR_ImportDocument", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrImportDocument_GrHeader",
                        column: x => x.HeaderId,
                        principalTable: "RII_GR_Header",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_GR_ImportL",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LineId = table.Column<long>(type: "bigint", nullable: true),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    StockCode = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    Description1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_GR_ImportL", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_GR_ImportL_RII_GR_Header_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "RII_GR_Header",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_GR_ImportSerialLine",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImportLineId = table.Column<long>(type: "bigint", nullable: false),
                    SerialNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,6)", nullable: false),
                    TargetWarehouse = table.Column<short>(type: "smallint", nullable: false),
                    TargetCellCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ScannedBarcode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SerialNumber2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SerialNumber3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SerialNumber4 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_GR_ImportSerialLine", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrImportSerialLine_GrImportL",
                        column: x => x.ImportLineId,
                        principalTable: "RII_GR_ImportL",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_GR_Line",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ErpProductCode = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    MeasurementUnit = table.Column<byte>(type: "tinyint", nullable: false),
                    IsSerial = table.Column<bool>(type: "bit", nullable: false),
                    AutoSerial = table.Column<bool>(type: "bit", nullable: false),
                    QuantityBySerial = table.Column<bool>(type: "bit", nullable: false),
                    TargetWarehouse = table.Column<short>(type: "smallint", nullable: true),
                    Description1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description3 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_GR_Line", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrLine_GrHeader",
                        column: x => x.HeaderId,
                        principalTable: "RII_GR_Header",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_MOBIL_PAGE_GROUP",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    GroupCode = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MenuHeaderId = table.Column<long>(type: "bigint", nullable: false),
                    MenuLineId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_MOBIL_PAGE_GROUP", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_MOBIL_USER_GROUP_MATCH",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    GroupCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_MOBIL_USER_GROUP_MATCH", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_MOBIL_USER_PAGE_GROUP_MATCH",
                columns: table => new
                {
                    MobilePageGroupsId = table.Column<long>(type: "bigint", nullable: false),
                    UserGroupMatchesId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_MOBIL_USER_PAGE_GROUP_MATCH", x => new { x.MobilePageGroupsId, x.UserGroupMatchesId });
                    table.ForeignKey(
                        name: "FK_RII_MOBIL_USER_PAGE_GROUP_MATCH_RII_MOBIL_PAGE_GROUP_MobilePageGroupsId",
                        column: x => x.MobilePageGroupsId,
                        principalTable: "RII_MOBIL_PAGE_GROUP",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RII_MOBIL_USER_PAGE_GROUP_MATCH_RII_MOBIL_USER_GROUP_MATCH_UserGroupMatchesId",
                        column: x => x.UserGroupMatchesId,
                        principalTable: "RII_MOBIL_USER_GROUP_MATCH",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RII_MOBILMENU_HEADER",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IsOpen = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_MOBILMENU_HEADER", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_MOBILMENU_LINE",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_MOBILMENU_LINE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_MOBILMENU_LINE_RII_MOBILMENU_HEADER_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "RII_MOBILMENU_HEADER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_PLATFORM_SIDEBARMENU_HEADER",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuKey = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Color = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DarkColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ShadowColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DarkShadowColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TextColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DarkTextColor = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    RoleLevel = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_PLATFORM_SIDEBARMENU_HEADER", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_PLATFORM_SIDEBARMENU_LINE",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    Page = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_PLATFORM_SIDEBARMENU_LINE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_PLATFORM_SIDEBARMENU_LINE_RII_PLATFORM_SIDEBARMENU_HEADER_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "RII_PLATFORM_SIDEBARMENU_HEADER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_BOX",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImportLineId = table.Column<long>(type: "bigint", nullable: false),
                    BoxNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BoxNumber = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BoxCode = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BoxType = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Weight = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    Volume = table.Column<decimal>(type: "decimal(18,4)", nullable: true),
                    Description1 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_BOX", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_HEADER",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    ProjectCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    DocumentNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DocumentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DocumentType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    CustomerCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SourceWarehouse = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TargetWarehouse = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true, defaultValue: "0"),
                    YearCode = table.Column<string>(type: "nvarchar(4)", maxLength: 4, nullable: false),
                    Description1 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    PriorityLevel = table.Column<byte>(type: "tinyint", nullable: true),
                    Type = table.Column<byte>(type: "tinyint", maxLength: 20, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    CompletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    IsPendingApproval = table.Column<bool>(type: "bit", nullable: false),
                    ApprovalStatus = table.Column<bool>(type: "bit", nullable: true),
                    ApprovedByUserId = table.Column<long>(type: "bigint", nullable: true),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsERPIntegrated = table.Column<bool>(type: "bit", nullable: false),
                    ERPReferenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ERPIntegrationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ERPIntegrationStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ERPErrorMessage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_HEADER", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_IMPORT_LINE",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    LineId = table.Column<long>(type: "bigint", nullable: false),
                    LineId1 = table.Column<long>(type: "bigint", nullable: false),
                    RouteId = table.Column<long>(type: "bigint", nullable: true),
                    StockCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SerialNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SerialNo2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SerialNo3 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SerialNo4 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ScannedBarkod = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ErpOrderNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ErpOrderNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ErpOrderLineNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    ErpOrderSequence = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Description1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_IMPORT_LINE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_TR_IMPORT_LINE_RII_TR_HEADER_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "RII_TR_HEADER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_LINE",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeaderId = table.Column<long>(type: "bigint", nullable: false),
                    StockCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    ErpOrderNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ErpOrderLineNo = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    ErpLineReference = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TrHeaderId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_LINE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_TR_LINE_RII_TR_HEADER_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "RII_TR_HEADER",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RII_TR_LINE_RII_TR_HEADER_TrHeaderId",
                        column: x => x.TrHeaderId,
                        principalTable: "RII_TR_HEADER",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_ROUTE",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LineId = table.Column<long>(type: "bigint", nullable: false),
                    StockCode = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    RouteCode = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,4)", nullable: false),
                    SerialNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SerialNo2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SourceWarehouse = table.Column<int>(type: "int", nullable: true),
                    TargetWarehouse = table.Column<int>(type: "int", nullable: true),
                    SourceCellCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    TargetCellCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_ROUTE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_TR_ROUTE_RII_TR_LINE_LineId",
                        column: x => x.LineId,
                        principalTable: "RII_TR_LINE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_SBOX",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImportLineId = table.Column<long>(type: "bigint", nullable: false),
                    BoxId = table.Column<long>(type: "bigint", nullable: false),
                    BoxNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    BoxCode = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    SerialNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StockCode = table.Column<string>(type: "nvarchar(35)", maxLength: 35, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description1 = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Description2 = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_SBOX", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_TR_SBOX_RII_TR_BOX_BoxId",
                        column: x => x.BoxId,
                        principalTable: "RII_TR_BOX",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RII_TR_SBOX_RII_TR_IMPORT_LINE_ImportLineId",
                        column: x => x.ImportLineId,
                        principalTable: "RII_TR_IMPORT_LINE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_TR_TERMINAL_LINE",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LineId = table.Column<long>(type: "bigint", nullable: false),
                    RouteId = table.Column<long>(type: "bigint", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: false),
                    UpdatedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_TR_TERMINAL_LINE", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_TR_TERMINAL_LINE_RII_TR_LINE_LineId",
                        column: x => x.LineId,
                        principalTable: "RII_TR_LINE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RII_TR_TERMINAL_LINE_RII_TR_ROUTE_RouteId",
                        column: x => x.RouteId,
                        principalTable: "RII_TR_ROUTE",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_USER_AUTHORITY",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_USER_AUTHORITY", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RII_USERS",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    RoleId = table.Column<long>(type: "bigint", nullable: false, defaultValue: 1L),
                    IsEmailConfirmed = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    LastLoginDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_USERS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_USERS_RII_USERS_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "RII_USERS",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RII_USERS_RII_USERS_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "RII_USERS",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RII_USERS_RII_USERS_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "RII_USERS",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RII_USERS_RII_USER_AUTHORITY_RoleId",
                        column: x => x.RoleId,
                        principalTable: "RII_USER_AUTHORITY",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RII_USER_SESSION",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    SessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RevokedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IpAddress = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserAgent = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    DeviceInfo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<long>(type: "bigint", nullable: true),
                    UpdatedBy = table.Column<long>(type: "bigint", nullable: true),
                    DeletedBy = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RII_USER_SESSION", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RII_USER_SESSION_RII_USERS_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "RII_USERS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RII_USER_SESSION_RII_USERS_DeletedBy",
                        column: x => x.DeletedBy,
                        principalTable: "RII_USERS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RII_USER_SESSION_RII_USERS_UpdatedBy",
                        column: x => x.UpdatedBy,
                        principalTable: "RII_USERS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RII_USER_SESSION_RII_USERS_UserId",
                        column: x => x.UserId,
                        principalTable: "RII_USERS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "RII_MOBILMENU_HEADER",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Icon", "IsDeleted", "IsOpen", "MenuId", "Title", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "cube-outline", false, false, "mal-kabul", "malKabul", null, null },
                    { 2L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "car-outline", false, false, "sevkiyat", "sevkiyat", null, null },
                    { 3L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "swap-horizontal-outline", false, false, "transfer", "transfer", null, null },
                    { 4L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "calculator-outline", false, false, "sayim", "sayim", null, null },
                    { 5L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "grid-outline", false, false, "hucre-takibi", "hucreTakibi", null, null },
                    { 6L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "construct-outline", false, false, "uretim", "uretim", null, null },
                    { 7L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "cube", false, false, "paketleme", "paketleme", null, null },
                    { 8L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "barcode-outline", false, false, "sesli-komut", "sesliKomut", null, null },
                    { 9L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "information-circle-outline", false, false, "genel-bilgi", "genelBilgi", null, null }
                });

            migrationBuilder.InsertData(
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                columns: new[] { "Id", "Color", "CreatedBy", "CreatedDate", "DarkColor", "DarkShadowColor", "DarkTextColor", "DeletedBy", "DeletedDate", "Icon", "MenuKey", "RoleLevel", "ShadowColor", "TextColor", "Title", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1L, "blue-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "blue-700", "blue-500", "blue-400", null, null, "HiOutlineCube", "malKabul", 2, "blue-300", "blue-600", "sidebar.malKabul.title", null, null },
                    { 2L, "purple-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "purple-700", "purple-500", "purple-400", null, null, "HiOutlineTruck", "sevkiyat", 2, "purple-300", "purple-600", "sidebar.sevkiyat.title", null, null },
                    { 3L, "cyan-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "cyan-700", "cyan-500", "cyan-400", null, null, "HiOutlineRefresh", "transfer", 2, "cyan-300", "cyan-600", "sidebar.transfer.title", null, null },
                    { 4L, "orange-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "orange-700", "orange-500", "orange-400", null, null, "HiOutlineCalculator", "sayim", 2, "orange-300", "orange-600", "sidebar.sayim.title", null, null },
                    { 5L, "indigo-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "indigo-700", "indigo-500", "indigo-400", null, null, "HiOutlineViewGrid", "hucreTakibi", 2, "indigo-300", "indigo-600", "sidebar.hucreTakibi.title", null, null },
                    { 6L, "yellow-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "yellow-700", "yellow-500", "yellow-400", null, null, "HiOutlineCollection", "uretim", 2, "yellow-300", "yellow-600", "sidebar.uretim.title", null, null },
                    { 7L, "red-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "red-700", "red-500", "red-400", null, null, "HiOutlineCollection", "paketleme", 2, "red-300", "red-600", "sidebar.paketleme.title", null, null },
                    { 8L, "green-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "green-700", "green-500", "green-400", null, null, "HiOutlineCog", "yonetim", 3, "green-300", "green-600", "sidebar.yonetim.title", null, null },
                    { 9L, "teal-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "teal-700", "teal-500", "teal-400", null, null, "RiSettingsFill", "parametreler", 2, "teal-300", "teal-600", "sidebar.parametreler.title", null, null },
                    { 10L, "fuchsia-100", null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "fuchsia-700", "fuchsia-500", "fuchsia-400", null, null, "LuFileChartLine", "raporlar", 2, "fuchsia-300", "fuchsia-600", "sidebar.raporlar.title", null, null }
                });

            migrationBuilder.InsertData(
                table: "RII_USER_AUTHORITY",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Title", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "user", null, null },
                    { 2L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "admin", null, null },
                    { 3L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "superadmin", null, null }
                });

            migrationBuilder.InsertData(
                table: "RII_MOBILMENU_LINE",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Description", "HeaderId", "Icon", "IsDeleted", "ItemId", "Title", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "iadeGirisiDesc", 1L, "return-up-back-outline", false, "iade-girisi", "iadeGirisi", null, null },
                    { 2L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "irsaliyeFaturaDesc", 1L, "document-text-outline", false, "irsaliye-fatura", "irsaliyeFatura", null, null },
                    { 3L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sevkiyatEmriDesc", 2L, "send-outline", false, "sevkiyat-emri", "sevkiyatEmri", null, null },
                    { 4L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sevkiyatKontrolDesc", 2L, "send-outline", false, "sevkiyat-kontrol", "sevkiyatKontrol", null, null },
                    { 5L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "depoTransferiDesc", 3L, "archive-outline", false, "depo-transferi", "depoTransferi", null, null },
                    { 6L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "ambarGirisDesc", 3L, "enter-outline", false, "ambar-giris", "ambarGiris", null, null },
                    { 7L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "ambarCikisDesc", 3L, "exit-outline", false, "ambar-cikis", "ambarCikis", null, null },
                    { 8L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "planliDepoTransferiDesc", 3L, "calendar-outline", false, "planli-depo-transferi", "planliDepoTransferi", null, null },
                    { 9L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "planliAmbarCikisDesc", 3L, "calendar-clear-outline", false, "planli-ambar-cikis", "planliAmbarCikis", null, null },
                    { 10L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sayimGirisiDesc", 4L, "list-outline", false, "sayim-girisi", "sayimGirisi", null, null },
                    { 11L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "hucreBilgisiDesc", 5L, "move-outline", false, "hucre-transferi", "hucreBilgisi", null, null },
                    { 12L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "hucrelerArasiTransferDesc", 5L, "swap-vertical-outline", false, "hucreler-arasi-transfer", "hucrelerArasiTransfer", null, null },
                    { 13L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "planliHucreTransferiDesc", 5L, "calendar-outline", false, "planli-hucre-transferi", "planliHucreTransferi", null, null },
                    { 14L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "uretimSonuKaydiDesc", 6L, "checkmark-done-outline", false, "uretim-sonu-kaydi", "uretimSonuKaydi", null, null },
                    { 15L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "kioskDesc", 6L, "hammer-outline", false, "kiosk", "kiosk", null, null },
                    { 16L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "paketlemeGirisiDesc", 7L, "gift-outline", false, "paketleme-girisi", "paketlemeGirisi", null, null },
                    { 17L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "paketlemeIslemleriDesc", 7L, "layers-outline", false, "paketleme-islemleri", "paketlemeIslemleri", null, null },
                    { 18L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sesliKomutTestDesc", 8L, "repeat-outline", false, "sesli-komut-test", "sesliKomutTest", null, null },
                    { 19L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "stokDetayEkraniDesc", 9L, "analytics-outline", false, "stok-detay-ekrani", "stokDetayEkrani", null, null }
                });

            migrationBuilder.InsertData(
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Description", "HeaderId", "Icon", "Page", "Title", "UpdatedBy", "UpdatedDate" },
                values: new object[,]
                {
                    { 1L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.malKabul.completedListDesc", 1L, "HiOutlineDocumentText", "tamamlananMalKabulListesi", "sidebar.malKabul.completedList", null, null },
                    { 2L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.sevkiyat.createDesc", 2L, "HiOutlineTruck", "sevkiyatOlustur", "sidebar.sevkiyat.create", null, null },
                    { 3L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.sevkiyat.completedListDesc", 2L, "HiOutlineDocumentText", "tamamlananSevkiyatListesi", "sidebar.sevkiyat.completedList", null, null },
                    { 4L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.transfer.createInterWarehouseDesc", 3L, "HiOutlineRefresh", "depolarArasiTransferOlustur", "sidebar.transfer.createInterWarehouse", null, null },
                    { 5L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.transfer.orderBasedDesc", 3L, "HiOutlineDocumentText", "sipariseIstinadenDepolarArasiTransfer", "sidebar.transfer.orderBased", null, null },
                    { 6L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.transfer.completedDesc", 3L, "HiOutlineDocumentText", "tamamlanmisTransferEmirleri", "sidebar.transfer.completed", null, null },
                    { 7L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.transfer.productionBasedDesc", 3L, "HiOutlineCollection", "uretimeTransfer", "sidebar.transfer.productionBased", null, null },
                    { 8L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.transfer.warehouseExitDesc", 3L, "HiOutlineArrowLeft", "ambarCikisOlustur", "sidebar.transfer.warehouseExit", null, null },
                    { 9L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.sayim.createOrderDesc", 4L, "HiOutlineCalculator", "sayimEmriOlustur", "sidebar.sayim.createOrder", null, null },
                    { 10L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.sayim.completedListDesc", 4L, "HiOutlineDocumentText", "tamamlananSayimListesi", "sidebar.sayim.completedList", null, null },
                    { 11L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.hucreTakibi.createOrderDesc", 5L, "HiOutlineViewGrid", "hucreEmriOlustur", "sidebar.hucreTakibi.createOrder", null, null },
                    { 12L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.uretim.completedListDesc", 6L, "HiOutlineDocumentText", "tamamlananUretimListesi", "sidebar.uretim.completedList", null, null },
                    { 13L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.paketleme.completedListDesc", 7L, "HiOutlineDocumentText", "tamamlananPaketlemeListesi", "sidebar.paketleme.completedList", null, null },
                    { 14L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.kullanici.islemleriDesc", 8L, "HiOutlineUsers", "kullaniciIslemleri", "sidebar.kullanici.islemleri", null, null },
                    { 15L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.platformGrup.islemleriDesc", 8L, "HiOutlineUserGroup", "platformGrupIslemleri", "sidebar.platformGrup.islemleri", null, null },
                    { 16L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.platformKullaniciGrup.islemleriDesc", 8L, "HiOutlineUserGroup", "platformKullaniciGrupEslemeIslemleri", "sidebar.platformKullaniciGrup.islemleri", null, null },
                    { 17L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.mobilGrup.islemleriDesc", 8L, "HiOutlineUserGroup", "mobilGrupIslemleri", "sidebar.mobilGrup.islemleri", null, null },
                    { 18L, null, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, null, "sidebar.mobilKullaniciGrup.islemleriDesc", 8L, "HiOutlineUserGroup", "mobilKullaniciGrupEslemeIslemleri", "sidebar.mobilKullaniciGrup.islemleri", null, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_CreatedBy",
                table: "PlatformPageGroup",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_DeletedBy",
                table: "PlatformPageGroup",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_GroupCode",
                table: "PlatformPageGroup",
                column: "GroupCode");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_IsDeleted",
                table: "PlatformPageGroup",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_MenuHeaderId",
                table: "PlatformPageGroup",
                column: "MenuHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_MenuLineId",
                table: "PlatformPageGroup",
                column: "MenuLineId");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformPageGroup_UpdatedBy",
                table: "PlatformPageGroup",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_CreatedBy",
                table: "PlatformUserGroupMatch",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_DeletedBy",
                table: "PlatformUserGroupMatch",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_GroupCode",
                table: "PlatformUserGroupMatch",
                column: "GroupCode");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_GroupsId",
                table: "PlatformUserGroupMatch",
                column: "GroupsId");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_IsDeleted",
                table: "PlatformUserGroupMatch",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_UpdatedBy",
                table: "PlatformUserGroupMatch",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_UserId",
                table: "PlatformUserGroupMatch",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlatformUserGroupMatch_UserId_GroupCode",
                table: "PlatformUserGroupMatch",
                columns: new[] { "UserId", "GroupCode" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GrHeader_BranchCode",
                table: "RII_GR_Header",
                column: "BranchCode");

            migrationBuilder.CreateIndex(
                name: "IX_GrHeader_BranchCode_DocumentDate",
                table: "RII_GR_Header",
                columns: new[] { "BranchCode", "DocumentDate" });

            migrationBuilder.CreateIndex(
                name: "IX_GrHeader_CustomerCode",
                table: "RII_GR_Header",
                column: "CustomerCode");

            migrationBuilder.CreateIndex(
                name: "IX_GrHeader_CustomerCode_DocumentDate",
                table: "RII_GR_Header",
                columns: new[] { "CustomerCode", "DocumentDate" });

            migrationBuilder.CreateIndex(
                name: "IX_GrHeader_DocumentDate",
                table: "RII_GR_Header",
                column: "DocumentDate");

            migrationBuilder.CreateIndex(
                name: "IX_GrHeader_ERPDocumentNo",
                table: "RII_GR_Header",
                column: "ERPDocumentNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_Header_CreatedBy",
                table: "RII_GR_Header",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_Header_DeletedBy",
                table: "RII_GR_Header",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_Header_UpdatedBy",
                table: "RII_GR_Header",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_GrImportDocument_HeaderId",
                table: "RII_GR_ImportDocument",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_GrImportDocument_IsDeleted",
                table: "RII_GR_ImportDocument",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportDocument_CreatedBy",
                table: "RII_GR_ImportDocument",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportDocument_DeletedBy",
                table: "RII_GR_ImportDocument",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportDocument_UpdatedBy",
                table: "RII_GR_ImportDocument",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportL_CreatedBy",
                table: "RII_GR_ImportL",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportL_DeletedBy",
                table: "RII_GR_ImportL",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportL_HeaderId",
                table: "RII_GR_ImportL",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportL_LineId",
                table: "RII_GR_ImportL",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportL_UpdatedBy",
                table: "RII_GR_ImportL",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_GrImportSerialLine_ImportLineId",
                table: "RII_GR_ImportSerialLine",
                column: "ImportLineId");

            migrationBuilder.CreateIndex(
                name: "IX_GrImportSerialLine_IsDeleted",
                table: "RII_GR_ImportSerialLine",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_GrImportSerialLine_ScannedBarcode",
                table: "RII_GR_ImportSerialLine",
                column: "ScannedBarcode");

            migrationBuilder.CreateIndex(
                name: "IX_GrImportSerialLine_SerialNumber",
                table: "RII_GR_ImportSerialLine",
                column: "SerialNumber");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportSerialLine_CreatedBy",
                table: "RII_GR_ImportSerialLine",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportSerialLine_DeletedBy",
                table: "RII_GR_ImportSerialLine",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_ImportSerialLine_UpdatedBy",
                table: "RII_GR_ImportSerialLine",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_GrLine_ErpProductCode",
                table: "RII_GR_Line",
                column: "ErpProductCode");

            migrationBuilder.CreateIndex(
                name: "IX_GrLine_HeaderId",
                table: "RII_GR_Line",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_GrLine_IsDeleted",
                table: "RII_GR_Line",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_Line_CreatedBy",
                table: "RII_GR_Line",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_Line_DeletedBy",
                table: "RII_GR_Line",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_GR_Line_UpdatedBy",
                table: "RII_GR_Line",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_PAGE_GROUP_CreatedBy",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_PAGE_GROUP_DeletedBy",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_PAGE_GROUP_MenuHeaderId",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "MenuHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_PAGE_GROUP_MenuLineId",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "MenuLineId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_PAGE_GROUP_UpdatedBy",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_USER_GROUP_MATCH_CreatedBy",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_USER_GROUP_MATCH_DeletedBy",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_USER_GROUP_MATCH_UpdatedBy",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_USER_GROUP_MATCH_UserId",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBIL_USER_PAGE_GROUP_MATCH_UserGroupMatchesId",
                table: "RII_MOBIL_USER_PAGE_GROUP_MATCH",
                column: "UserGroupMatchesId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_HEADER_CreatedBy",
                table: "RII_MOBILMENU_HEADER",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_HEADER_DeletedBy",
                table: "RII_MOBILMENU_HEADER",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_HEADER_UpdatedBy",
                table: "RII_MOBILMENU_HEADER",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_LINE_CreatedBy",
                table: "RII_MOBILMENU_LINE",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_LINE_DeletedBy",
                table: "RII_MOBILMENU_LINE",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_LINE_HeaderId",
                table: "RII_MOBILMENU_LINE",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_MOBILMENU_LINE_UpdatedBy",
                table: "RII_MOBILMENU_LINE",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_PLATFORM_SIDEBARMENU_HEADER_CreatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_PLATFORM_SIDEBARMENU_HEADER_DeletedBy",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_PLATFORM_SIDEBARMENU_HEADER_UpdatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SidebarmenuHeader_IsDeleted",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_SidebarmenuHeader_MenuKey",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "MenuKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SidebarmenuHeader_RoleLevel",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "RoleLevel");

            migrationBuilder.CreateIndex(
                name: "IX_RII_PLATFORM_SIDEBARMENU_LINE_CreatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_PLATFORM_SIDEBARMENU_LINE_DeletedBy",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_PLATFORM_SIDEBARMENU_LINE_UpdatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SidebarmenuLine_HeaderId",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_SidebarmenuLine_IsDeleted",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_SidebarmenuLine_Page",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "Page",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_BOX_CreatedBy",
                table: "RII_TR_BOX",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_BOX_DeletedBy",
                table: "RII_TR_BOX",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_BOX_UpdatedBy",
                table: "RII_TR_BOX",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrBox_BoxNo",
                table: "RII_TR_BOX",
                column: "BoxNo");

            migrationBuilder.CreateIndex(
                name: "IX_TrBox_ImportLineId",
                table: "RII_TR_BOX",
                column: "ImportLineId");

            migrationBuilder.CreateIndex(
                name: "IX_TrBox_IsDeleted",
                table: "RII_TR_BOX",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_HEADER_CreatedBy",
                table: "RII_TR_HEADER",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_HEADER_DeletedBy",
                table: "RII_TR_HEADER",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_HEADER_UpdatedBy",
                table: "RII_TR_HEADER",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_BranchCode",
                table: "RII_TR_HEADER",
                column: "BranchCode");

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_CustomerCode",
                table: "RII_TR_HEADER",
                column: "CustomerCode");

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_DocumentDate",
                table: "RII_TR_HEADER",
                column: "DocumentDate");

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_DocumentNo",
                table: "RII_TR_HEADER",
                column: "DocumentNo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_IsDeleted",
                table: "RII_TR_HEADER",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_ProjectCode",
                table: "RII_TR_HEADER",
                column: "ProjectCode");

            migrationBuilder.CreateIndex(
                name: "IX_TrHeader_YearCode",
                table: "RII_TR_HEADER",
                column: "YearCode");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_IMPORT_LINE_CreatedBy",
                table: "RII_TR_IMPORT_LINE",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_IMPORT_LINE_DeletedBy",
                table: "RII_TR_IMPORT_LINE",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_IMPORT_LINE_LineId1",
                table: "RII_TR_IMPORT_LINE",
                column: "LineId1");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_IMPORT_LINE_UpdatedBy",
                table: "RII_TR_IMPORT_LINE",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrImportLine_ErpOrderNo",
                table: "RII_TR_IMPORT_LINE",
                column: "ErpOrderNo");

            migrationBuilder.CreateIndex(
                name: "IX_TrImportLine_HeaderId",
                table: "RII_TR_IMPORT_LINE",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_TrImportLine_IsDeleted",
                table: "RII_TR_IMPORT_LINE",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_TrImportLine_LineId",
                table: "RII_TR_IMPORT_LINE",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_TrImportLine_RouteId",
                table: "RII_TR_IMPORT_LINE",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_TrImportLine_StockCode",
                table: "RII_TR_IMPORT_LINE",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_LINE_CreatedBy",
                table: "RII_TR_LINE",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_LINE_DeletedBy",
                table: "RII_TR_LINE",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_LINE_TrHeaderId",
                table: "RII_TR_LINE",
                column: "TrHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_LINE_UpdatedBy",
                table: "RII_TR_LINE",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrLine_ErpOrderNo",
                table: "RII_TR_LINE",
                column: "ErpOrderNo");

            migrationBuilder.CreateIndex(
                name: "IX_TrLine_HeaderId",
                table: "RII_TR_LINE",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_TrLine_IsDeleted",
                table: "RII_TR_LINE",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_TrLine_StockCode",
                table: "RII_TR_LINE",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_ROUTE_CreatedBy",
                table: "RII_TR_ROUTE",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_ROUTE_DeletedBy",
                table: "RII_TR_ROUTE",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_ROUTE_UpdatedBy",
                table: "RII_TR_ROUTE",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrRoute_IsDeleted",
                table: "RII_TR_ROUTE",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_TrRoute_LineId",
                table: "RII_TR_ROUTE",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_TrRoute_SerialNo",
                table: "RII_TR_ROUTE",
                column: "SerialNo");

            migrationBuilder.CreateIndex(
                name: "IX_TrRoute_SourceWarehouse",
                table: "RII_TR_ROUTE",
                column: "SourceWarehouse");

            migrationBuilder.CreateIndex(
                name: "IX_TrRoute_StockCode",
                table: "RII_TR_ROUTE",
                column: "StockCode");

            migrationBuilder.CreateIndex(
                name: "IX_TrRoute_TargetWarehouse",
                table: "RII_TR_ROUTE",
                column: "TargetWarehouse");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_SBOX_CreatedBy",
                table: "RII_TR_SBOX",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_SBOX_DeletedBy",
                table: "RII_TR_SBOX",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_SBOX_UpdatedBy",
                table: "RII_TR_SBOX",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrSBox_BoxId",
                table: "RII_TR_SBOX",
                column: "BoxId");

            migrationBuilder.CreateIndex(
                name: "IX_TrSBox_ImportLineId",
                table: "RII_TR_SBOX",
                column: "ImportLineId");

            migrationBuilder.CreateIndex(
                name: "IX_TrSBox_IsDeleted",
                table: "RII_TR_SBOX",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_TrSBox_SerialNo",
                table: "RII_TR_SBOX",
                column: "SerialNumber");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_TERMINAL_LINE_CreatedBy",
                table: "RII_TR_TERMINAL_LINE",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_TERMINAL_LINE_DeletedBy",
                table: "RII_TR_TERMINAL_LINE",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_TR_TERMINAL_LINE_UpdatedBy",
                table: "RII_TR_TERMINAL_LINE",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_TrTerminalLine_IsDeleted",
                table: "RII_TR_TERMINAL_LINE",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_TrTerminalLine_LineId",
                table: "RII_TR_TERMINAL_LINE",
                column: "LineId");

            migrationBuilder.CreateIndex(
                name: "IX_TrTerminalLine_RouteId",
                table: "RII_TR_TERMINAL_LINE",
                column: "RouteId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_AUTHORITY_CreatedBy",
                table: "RII_USER_AUTHORITY",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_AUTHORITY_DeletedBy",
                table: "RII_USER_AUTHORITY",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_AUTHORITY_UpdatedBy",
                table: "RII_USER_AUTHORITY",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_SESSION_CreatedBy",
                table: "RII_USER_SESSION",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_SESSION_DeletedBy",
                table: "RII_USER_SESSION",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_SESSION_SessionId",
                table: "RII_USER_SESSION",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_SESSION_UpdatedBy",
                table: "RII_USER_SESSION",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_SESSION_UserId",
                table: "RII_USER_SESSION",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USER_SESSION_UserId_RevokedAt",
                table: "RII_USER_SESSION",
                columns: new[] { "UserId", "RevokedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_RII_USERS_CreatedBy",
                table: "RII_USERS",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USERS_DeletedBy",
                table: "RII_USERS",
                column: "DeletedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USERS_Email",
                table: "RII_USERS",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RII_USERS_RoleId",
                table: "RII_USERS",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USERS_UpdatedBy",
                table: "RII_USERS",
                column: "UpdatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_RII_USERS_Username",
                table: "RII_USERS",
                column: "Username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformPageGroup_RII_PLATFORM_SIDEBARMENU_HEADER_MenuHeaderId",
                table: "PlatformPageGroup",
                column: "MenuHeaderId",
                principalTable: "RII_PLATFORM_SIDEBARMENU_HEADER",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformPageGroup_RII_PLATFORM_SIDEBARMENU_LINE_MenuLineId",
                table: "PlatformPageGroup",
                column: "MenuLineId",
                principalTable: "RII_PLATFORM_SIDEBARMENU_LINE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformPageGroup_RII_USERS_CreatedBy",
                table: "PlatformPageGroup",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformPageGroup_RII_USERS_DeletedBy",
                table: "PlatformPageGroup",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformPageGroup_RII_USERS_UpdatedBy",
                table: "PlatformPageGroup",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformUserGroupMatch_RII_USERS_CreatedBy",
                table: "PlatformUserGroupMatch",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformUserGroupMatch_RII_USERS_DeletedBy",
                table: "PlatformUserGroupMatch",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformUserGroupMatch_RII_USERS_UpdatedBy",
                table: "PlatformUserGroupMatch",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlatformUserGroupMatch_RII_USERS_UserId",
                table: "PlatformUserGroupMatch",
                column: "UserId",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_Header_RII_USERS_CreatedBy",
                table: "RII_GR_Header",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_Header_RII_USERS_DeletedBy",
                table: "RII_GR_Header",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_Header_RII_USERS_UpdatedBy",
                table: "RII_GR_Header",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportDocument_RII_USERS_CreatedBy",
                table: "RII_GR_ImportDocument",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportDocument_RII_USERS_DeletedBy",
                table: "RII_GR_ImportDocument",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportDocument_RII_USERS_UpdatedBy",
                table: "RII_GR_ImportDocument",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportL_RII_GR_Line_LineId",
                table: "RII_GR_ImportL",
                column: "LineId",
                principalTable: "RII_GR_Line",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportL_RII_USERS_CreatedBy",
                table: "RII_GR_ImportL",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportL_RII_USERS_DeletedBy",
                table: "RII_GR_ImportL",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_GR_ImportL_RII_USERS_UpdatedBy",
                table: "RII_GR_ImportL",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GrImportSerialLine_CreatedBy",
                table: "RII_GR_ImportSerialLine",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GrImportSerialLine_DeletedBy",
                table: "RII_GR_ImportSerialLine",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GrImportSerialLine_UpdatedBy",
                table: "RII_GR_ImportSerialLine",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GrLine_CreatedBy",
                table: "RII_GR_Line",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GrLine_DeletedBy",
                table: "RII_GR_Line",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GrLine_UpdatedBy",
                table: "RII_GR_Line",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_PAGE_GROUP_RII_MOBILMENU_HEADER_MenuHeaderId",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "MenuHeaderId",
                principalTable: "RII_MOBILMENU_HEADER",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_PAGE_GROUP_RII_MOBILMENU_LINE_MenuLineId",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "MenuLineId",
                principalTable: "RII_MOBILMENU_LINE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_PAGE_GROUP_RII_USERS_CreatedBy",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_PAGE_GROUP_RII_USERS_DeletedBy",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_PAGE_GROUP_RII_USERS_UpdatedBy",
                table: "RII_MOBIL_PAGE_GROUP",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_USER_GROUP_MATCH_RII_USERS_CreatedBy",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_USER_GROUP_MATCH_RII_USERS_DeletedBy",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_USER_GROUP_MATCH_RII_USERS_UpdatedBy",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBIL_USER_GROUP_MATCH_RII_USERS_UserId",
                table: "RII_MOBIL_USER_GROUP_MATCH",
                column: "UserId",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBILMENU_HEADER_RII_USERS_CreatedBy",
                table: "RII_MOBILMENU_HEADER",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBILMENU_HEADER_RII_USERS_DeletedBy",
                table: "RII_MOBILMENU_HEADER",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBILMENU_HEADER_RII_USERS_UpdatedBy",
                table: "RII_MOBILMENU_HEADER",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBILMENU_LINE_RII_USERS_CreatedBy",
                table: "RII_MOBILMENU_LINE",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBILMENU_LINE_RII_USERS_DeletedBy",
                table: "RII_MOBILMENU_LINE",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_MOBILMENU_LINE_RII_USERS_UpdatedBy",
                table: "RII_MOBILMENU_LINE",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_PLATFORM_SIDEBARMENU_HEADER_RII_USERS_CreatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_PLATFORM_SIDEBARMENU_HEADER_RII_USERS_DeletedBy",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_PLATFORM_SIDEBARMENU_HEADER_RII_USERS_UpdatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_HEADER",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_PLATFORM_SIDEBARMENU_LINE_RII_USERS_CreatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_PLATFORM_SIDEBARMENU_LINE_RII_USERS_DeletedBy",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_PLATFORM_SIDEBARMENU_LINE_RII_USERS_UpdatedBy",
                table: "RII_PLATFORM_SIDEBARMENU_LINE",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_BOX_RII_TR_IMPORT_LINE_ImportLineId",
                table: "RII_TR_BOX",
                column: "ImportLineId",
                principalTable: "RII_TR_IMPORT_LINE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_BOX_RII_USERS_CREATED_BY",
                table: "RII_TR_BOX",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_BOX_RII_USERS_DELETED_BY",
                table: "RII_TR_BOX",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_BOX_RII_USERS_UPDATED_BY",
                table: "RII_TR_BOX",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_HEADER_RII_USERS_CREATED_BY",
                table: "RII_TR_HEADER",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_HEADER_RII_USERS_DELETED_BY",
                table: "RII_TR_HEADER",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_HEADER_RII_USERS_UPDATED_BY",
                table: "RII_TR_HEADER",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_IMPORT_LINE_RII_TR_LINE_LineId",
                table: "RII_TR_IMPORT_LINE",
                column: "LineId",
                principalTable: "RII_TR_LINE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_IMPORT_LINE_RII_TR_LINE_LineId1",
                table: "RII_TR_IMPORT_LINE",
                column: "LineId1",
                principalTable: "RII_TR_LINE",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_IMPORT_LINE_RII_TR_ROUTE_RouteId",
                table: "RII_TR_IMPORT_LINE",
                column: "RouteId",
                principalTable: "RII_TR_ROUTE",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_IMPORT_LINE_RII_USERS_CREATED_BY",
                table: "RII_TR_IMPORT_LINE",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_IMPORT_LINE_RII_USERS_DELETED_BY",
                table: "RII_TR_IMPORT_LINE",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_IMPORT_LINE_RII_USERS_UPDATED_BY",
                table: "RII_TR_IMPORT_LINE",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrLine_CreatedBy",
                table: "RII_TR_LINE",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrLine_DeletedBy",
                table: "RII_TR_LINE",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TrLine_UpdatedBy",
                table: "RII_TR_LINE",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_ROUTE_RII_USERS_CREATED_BY",
                table: "RII_TR_ROUTE",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_ROUTE_RII_USERS_DELETED_BY",
                table: "RII_TR_ROUTE",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_ROUTE_RII_USERS_UPDATED_BY",
                table: "RII_TR_ROUTE",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_SBOX_RII_USERS_CREATED_BY",
                table: "RII_TR_SBOX",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_SBOX_RII_USERS_DELETED_BY",
                table: "RII_TR_SBOX",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_SBOX_RII_USERS_UPDATED_BY",
                table: "RII_TR_SBOX",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_TERMINAL_LINE_RII_USERS_CREATED_BY",
                table: "RII_TR_TERMINAL_LINE",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_TERMINAL_LINE_RII_USERS_DELETED_BY",
                table: "RII_TR_TERMINAL_LINE",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_TR_TERMINAL_LINE_RII_USERS_UPDATED_BY",
                table: "RII_TR_TERMINAL_LINE",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RII_USER_AUTHORITY_RII_USERS_CreatedBy",
                table: "RII_USER_AUTHORITY",
                column: "CreatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_USER_AUTHORITY_RII_USERS_DeletedBy",
                table: "RII_USER_AUTHORITY",
                column: "DeletedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RII_USER_AUTHORITY_RII_USERS_UpdatedBy",
                table: "RII_USER_AUTHORITY",
                column: "UpdatedBy",
                principalTable: "RII_USERS",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RII_USER_AUTHORITY_RII_USERS_CreatedBy",
                table: "RII_USER_AUTHORITY");

            migrationBuilder.DropForeignKey(
                name: "FK_RII_USER_AUTHORITY_RII_USERS_DeletedBy",
                table: "RII_USER_AUTHORITY");

            migrationBuilder.DropForeignKey(
                name: "FK_RII_USER_AUTHORITY_RII_USERS_UpdatedBy",
                table: "RII_USER_AUTHORITY");

            migrationBuilder.DropTable(
                name: "PlatformUserGroupMatch");

            migrationBuilder.DropTable(
                name: "RII_GR_ImportDocument");

            migrationBuilder.DropTable(
                name: "RII_GR_ImportSerialLine");

            migrationBuilder.DropTable(
                name: "RII_MOBIL_USER_PAGE_GROUP_MATCH");

            migrationBuilder.DropTable(
                name: "RII_TR_SBOX");

            migrationBuilder.DropTable(
                name: "RII_TR_TERMINAL_LINE");

            migrationBuilder.DropTable(
                name: "RII_USER_SESSION");

            migrationBuilder.DropTable(
                name: "PlatformPageGroup");

            migrationBuilder.DropTable(
                name: "RII_GR_ImportL");

            migrationBuilder.DropTable(
                name: "RII_MOBIL_PAGE_GROUP");

            migrationBuilder.DropTable(
                name: "RII_MOBIL_USER_GROUP_MATCH");

            migrationBuilder.DropTable(
                name: "RII_TR_BOX");

            migrationBuilder.DropTable(
                name: "RII_PLATFORM_SIDEBARMENU_LINE");

            migrationBuilder.DropTable(
                name: "RII_GR_Line");

            migrationBuilder.DropTable(
                name: "RII_MOBILMENU_LINE");

            migrationBuilder.DropTable(
                name: "RII_TR_IMPORT_LINE");

            migrationBuilder.DropTable(
                name: "RII_PLATFORM_SIDEBARMENU_HEADER");

            migrationBuilder.DropTable(
                name: "RII_GR_Header");

            migrationBuilder.DropTable(
                name: "RII_MOBILMENU_HEADER");

            migrationBuilder.DropTable(
                name: "RII_TR_ROUTE");

            migrationBuilder.DropTable(
                name: "RII_TR_LINE");

            migrationBuilder.DropTable(
                name: "RII_TR_HEADER");

            migrationBuilder.DropTable(
                name: "RII_USERS");

            migrationBuilder.DropTable(
                name: "RII_USER_AUTHORITY");
        }
    }
}
