// Authentication DTOs (camelCase serialization)
export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: UserDto;
  sessionId: string;
  expiresAt: string;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  role: string;
  phoneNumber?: string;
}

