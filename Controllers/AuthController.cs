using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using WMS_WEBAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.SignalR;
using WMS_WEBAPI.Hubs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly WmsDbContext _context;
        private readonly IConfiguration _config;
        private readonly IHubContext<AuthHub> _hubContext;
        private readonly ILocalizationService _localizationService;
        private readonly IAuthService _authService;

        public AuthController(WmsDbContext context, IConfiguration config, IHubContext<AuthHub> hubContext, ILocalizationService localizationService, IAuthService authService)
        {
            _context = context;
            _config = config;
            _hubContext = hubContext;
            _localizationService = localizationService;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // AuthService'i kullanarak login işlemini gerçekleştir
                var loginDto = new LoginDto
                {
                    Username = request.Email, // Email veya username olarak kullanılacak
                    Password = request.Password
                };

                var loginResult = await _authService.LoginAsync(loginDto);
                
                if (!loginResult.Success)
                {
                    var errorResponse = new ApiResponse<object>
                    {
                        Success = false,
                        Message = loginResult.Message,
                        ExceptionMessage = loginResult.ExceptionMessage,
                        StatusCode = loginResult.StatusCode,
                        Data = null
                    };
                    return StatusCode(errorResponse.StatusCode, errorResponse);
                }

                // Kullanıcıyı bul (token'dan user bilgisini almak için)
                var user = _context.Users
                    .FirstOrDefault(u => (u.Email == request.Email || u.Username == request.Email) && u.IsActive);

                if (user == null)
                {
                    var errorResponse = new ApiResponse<object>
                    {
                        Success = false,
                        Message = _localizationService.GetLocalizedString("Error.User.InvalidCredentials"),
                        ExceptionMessage = "User not found",
                        StatusCode = 401,
                        Data = null
                    };
                    return StatusCode(errorResponse.StatusCode, errorResponse);
                }

                // Mevcut session varsa iptal et ve SignalR ile kullanıcıyı çıkış yaptır
                var activeSession = _context.UserSessions
                    .FirstOrDefault(s => s.UserId == user.Id && s.RevokedAt == null);

                if (activeSession != null)
                {
                    activeSession.RevokedAt = DateTime.UtcNow;
                    _context.SaveChanges();
                    
                    // SignalR ile eski kullanıcıyı çıkış yaptır
                    await AuthHub.ForceLogoutUser(_hubContext, user.Id.ToString());
                }

                // Yeni session oluştur
                var session = new UserSession
                {
                    UserId = user.Id,
                    SessionId = Guid.NewGuid(),
                    CreatedAt = DateTime.UtcNow,
                    Token = loginResult.Data! // AuthService'den gelen token
                };
                _context.UserSessions.Add(session);
                _context.SaveChanges();

                var successResponse = new ApiResponse<object>
                {
                    Success = true,
                    Message = loginResult.Message,
                    StatusCode = 200,
                    Data = new { token = loginResult.Data }
                };
                return StatusCode(successResponse.StatusCode, successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = new ApiResponse<object>
                {
                    Success = false,
                    Message = _localizationService.GetLocalizedString("Error.User.LoginFailed"),
                    ExceptionMessage = ex.Message,
                    StatusCode = 500,
                    Data = null
                };
                return StatusCode(errorResponse.StatusCode, errorResponse);
            }
        }

        [AllowAnonymous]
        [HttpPost("admin-login")]
        public async Task<IActionResult> AdminLogin()
        {
            try
            {
                // Verii.com admin bilgileri
                var adminEmail = "admin@verii.com";
                var adminPassword = "Veriipass123!";

                // AuthService'i kullanarak login işlemini gerçekleştir
                var loginDto = new LoginDto
                {
                    Username = adminEmail,
                    Password = adminPassword
                };

                var loginResult = await _authService.LoginAsync(loginDto);
                
                if (!loginResult.Success)
                {
                    var errorResponse = new ApiResponse<object>
                    {
                        Success = false,
                        Message = loginResult.Message,
                        ExceptionMessage = loginResult.ExceptionMessage,
                        StatusCode = loginResult.StatusCode,
                        Data = null
                    };
                    return StatusCode(errorResponse.StatusCode, errorResponse);
                }

                // Kullanıcıyı bul (token'dan user bilgisini almak için)
                var user = _context.Users
                    .FirstOrDefault(u => (u.Email == adminEmail || u.Username == adminEmail) && u.IsActive);

                if (user == null)
                {
                    var errorResponse = new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Admin kullanıcısı bulunamadı",
                        ExceptionMessage = "Admin user not found",
                        StatusCode = 401,
                        Data = null
                    };
                    return StatusCode(errorResponse.StatusCode, errorResponse);
                }

                // Mevcut session varsa iptal et ve SignalR ile kullanıcıyı çıkış yaptır
                var activeSession = _context.UserSessions
                    .FirstOrDefault(s => s.UserId == user.Id && s.RevokedAt == null);

                if (activeSession != null)
                {
                    activeSession.RevokedAt = DateTime.UtcNow;
                    _context.SaveChanges();
                    
                    // SignalR ile eski kullanıcıyı çıkış yaptır
                    await AuthHub.ForceLogoutUser(_hubContext, user.Id.ToString());
                }

                // Yeni session oluştur
                var session = new UserSession
                {
                    UserId = user.Id,
                    SessionId = Guid.NewGuid(),
                    CreatedAt = DateTime.UtcNow,
                    Token = loginResult.Data! // AuthService'den gelen token
                };
                _context.UserSessions.Add(session);
                _context.SaveChanges();

                var successResponse = new ApiResponse<object>
                {
                    Success = true,
                    Message = "Admin girişi başarılı",
                    StatusCode = 200,
                    Data = new { token = loginResult.Data }
                };
                return StatusCode(successResponse.StatusCode, successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = new ApiResponse<object>
                {
                    Success = false,
                    Message = "Admin giriş işlemi başarısız",
                    ExceptionMessage = ex.Message,
                    StatusCode = 500,
                    Data = null
                };
                return StatusCode(errorResponse.StatusCode, errorResponse);
            }
        }

        [Authorize]
        [HttpGet("user")]
        public IActionResult GetProfile()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null)
                {
                    var errorResponse = new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Kullanıcı kimliği bulunamadı.",
                        ExceptionMessage = "Unauthorized",
                        StatusCode = 401,
                        Data = null
                    };
                    return StatusCode(errorResponse.StatusCode, errorResponse);
                }

                var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId);
                if (user == null)
                {
                    var errorResponse = new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Kullanıcı bulunamadı.",
                        ExceptionMessage = "NotFound",
                        StatusCode = 404,
                        Data = null
                    };
                    return StatusCode(errorResponse.StatusCode, errorResponse);
                }

                var userDto = new UserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    Role = user.RoleNavigation?.Title ?? "User",
                    FullName = user.FullName
                };

                var successResponse = new ApiResponse<UserDto>
                {
                    Success = true,
                    Message = "Profil başarıyla getirildi.",
                    StatusCode = 200,
                    Data = userDto
                };
                return StatusCode(successResponse.StatusCode, successResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = new ApiResponse<object>
                {
                    Success = false,
                    Message = "Profil getirme işlemi başarısız.",
                    ExceptionMessage = ex.Message,
                    StatusCode = 500,
                    Data = null
                };
                return StatusCode(errorResponse.StatusCode, errorResponse);
            }
        }
    }
}