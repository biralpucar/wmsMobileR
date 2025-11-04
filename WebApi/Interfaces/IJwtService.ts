import { ApiResponse } from '../Models/ApiResponse';
import { User } from '../Models/User';

export interface IJwtService {
  generateToken(user: User): ApiResponse<string>;
}