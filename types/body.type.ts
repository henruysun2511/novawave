import { Gender, VerificationStatus } from './constant.type';

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: Pagination;
}

export interface JwtPayload {
  sub: string;
  username: string;
  roleId: string;
  isPremium: boolean;
  exp: number;
  iat: number;
  jti: string;
  avatar?: string;
}

export interface LoginDto {
  username: string;
  password: string;
};

export interface LoginRes {
  accessToken: string;
  refreshToken?: string;
  roleName: string;
  username: string;
  isPrenium: boolean;
};

export interface RegisterDto {
  username: string,
  email: string,
  password: string,
  birthday: string,
  gender: Gender
}

export interface SendEmailDto {
  email: string
}

export interface VerifyOtpDto {
  email: string,
  otp: string
}

export interface ResetPasswordDto {
  newPassword: string
}

export interface ChangePasswordDto {
  newPassword: string,
  confirmPassword: string,
  oldPassword: string
}

export interface UpdateVerificationDto{
  status: VerificationStatus,
  rejectReason?: string 
}

export interface ReportDto{
  status: string
}

export interface AssignPermissionDto{
  permissions?: string[];
}






