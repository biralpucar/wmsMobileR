using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<User>> GetUserByUsernameAsync(string username);
        Task<ApiResponse<User>> GetUserByIdAsync(int id);
        Task<ApiResponse<User>> RegisterUserAsync(RegisterDto registerDto);
        Task<ApiResponse<string>> LoginAsync(LoginDto loginDto);
    }
}