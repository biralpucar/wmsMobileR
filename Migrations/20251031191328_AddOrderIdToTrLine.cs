using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WMS_WEBAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderIdToTrLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "RII_TR_LINE",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "RII_TR_LINE");
        }
    }
}
