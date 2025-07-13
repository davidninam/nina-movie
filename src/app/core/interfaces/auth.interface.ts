/**
 * User authentication interface
 * Follows Interface Segregation Principle - specific to authentication
 */
export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

/**
 * JWT Token interface
 */
export interface IJwtToken {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: IUser;
}

/**
 * Login credentials interface
 */
export interface ILoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data interface
 */
export interface IRegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  firstName: string;
  lastName: string;
}