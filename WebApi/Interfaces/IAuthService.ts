import { ApiResponse } from '../Models/ApiResponse';
import { User } from '../Models/User';
import { RegisterDto, LoginDto } from '../Models/AuthDtos';

export interface IAuthService {
  getUserByUsername(username: string): Promise<ApiResponse<User>>;
  getUserById(id: number): Promise<ApiResponse<User>>;
  registerUser(registerDto: RegisterDto): Promise<ApiResponse<User>>;
  login(loginDto: LoginDto): Promise<ApiResponse<string>>;
}