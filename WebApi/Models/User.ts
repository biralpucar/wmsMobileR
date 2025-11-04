import { BaseEntity } from './BaseEntity';
import { UserAuthority } from './UserAuthority';
import { UserSession } from './UserSession';

export interface User extends BaseEntity {
  username: string;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  roleId: number;
  roleNavigation?: UserAuthority;
  isEmailConfirmed: boolean;
  lastLoginDate?: string;
  refreshToken?: string;
  refreshTokenExpiryTime?: string;
  isActive: boolean;
  fullName: string; // Computed property
  
  // Navigation properties
  sessions?: UserSession[];
}