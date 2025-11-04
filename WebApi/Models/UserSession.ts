import { BaseEntity } from './BaseEntity';
import { User } from './User';

export interface UserSession extends BaseEntity {
  userId: number;
  user?: User;
  sessionId: string;
  token: string;
  createdAt: string;
  revokedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: string;
  isActive: boolean;
}