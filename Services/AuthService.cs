using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJwtService _jwtService;
        private readonly ILocalizationService _localizationService;

        public AuthService(IUnitOfWork unitOfWork, IJwtService jwtService, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _jwtService = jwtService;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<User>> GetUserByUsernameAsync(string username)
        {
            try
            {
                var users = await _unitOfWork.Users.GetAllAsync();
                var user = users.FirstOrDefault(u => u.Username == username);
                
                if (user == null)
                {
                    return ApiResponse<User>.ErrorResult(_localizationService.GetLocalizedString("UserNotFound"), "User not found", 404, default);
                }

                return ApiResponse<User>.SuccessResult(user, _localizationService.GetLocalizedString("OperationSuccessful"));
            }
            catch (Exception ex)
            {
                return ApiResponse<User>.ErrorResult(_localizationService.GetLocalizedString("InternalServerError"), ex.Message, 500, ex.Message);
            }
        }

        public async Task<ApiResponse<User>> GetUserByIdAsync(int id)
        {
            try
            {
                var user = await _unitOfWork.Users.GetByIdAsync(id);
                
                if (user == null)
                {
                    return ApiResponse<User>.ErrorResult(_localizationService.GetLocalizedString("UserNotFound"), "User not found", 404, default);
                }

                return ApiResponse<User>.SuccessResult(user, _localizationService.GetLocalizedString("OperationSuccessful"));
            }
            catch (Exception ex)
            {
                return ApiResponse<User>.ErrorResult(_localizationService.GetLocalizedString("InternalServerError"), ex.Message, 500, ex.Message);
            }
        }

        public async Task<ApiResponse<User>> RegisterUserAsync(RegisterDto registerDto)
        {
            try
            {
                // Check if user already exists
                var existingUserResponse = await GetUserByUsernameAsync(registerDto.Username);
                if (existingUserResponse.Success)
                {
                    return ApiResponse<User>.ErrorResult(_localizationService.GetLocalizedString("UserAlreadyExists"), "User already exists", 400, default);
                }

                // Create new user
                var user = new User
                {
                    Username = registerDto.Username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName
                };

                await _unitOfWork.Users.AddAsync(user);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<User>.SuccessResult(user, _localizationService.GetLocalizedString("UserRegisteredSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<User>.ErrorResult(_localizationService.GetLocalizedString("RegistrationFailed"), ex.Message, 500, "Registration failed");
            }
        }

        public async Task<ApiResponse<string>> LoginAsync(LoginDto loginDto)
        {
            try
            {
                // Email veya username ile kullanıcı arama
                var users = await _unitOfWork.Users.GetAllAsync();
                var user = users.FirstOrDefault(u => u.Username == loginDto.Username || u.Email == loginDto.Username);
                
                if (user == null)
                {
                    return ApiResponse<string>.ErrorResult(_localizationService.GetLocalizedString("Error.User.InvalidCredentials"), "Invalid credentials", 401, default);
                }
                
                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return ApiResponse<string>.ErrorResult(_localizationService.GetLocalizedString("Error.User.InvalidCredentials"), "Invalid credentials", 401, default);
                }

                var tokenResponse = _jwtService.GenerateToken(user);
                if (!tokenResponse.Success)
                {
                    return ApiResponse<string>.ErrorResult(_localizationService.GetLocalizedString("Error.User.LoginFailed"), tokenResponse.Message, 500, "Token generation failed");
                }
                
                return ApiResponse<string>.SuccessResult(tokenResponse.Data!, _localizationService.GetLocalizedString("Success.User.LoginSuccessful"));
            }
            catch (Exception ex)
            {
                return ApiResponse<string>.ErrorResult(_localizationService.GetLocalizedString("Error.User.LoginFailed"), ex.Message, 500, ex.Message);
            }
        }
    }
}
