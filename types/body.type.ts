export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type LoginDto = {
  username: string;
  password: string;
};

export type LoginRes = {
    accessToken: string;
    refreshToken: string;
};

export interface JwtPayload {
  sub: string;        
  username: string;
  roleId: string;
  isPremium: boolean;
  exp: number;
  iat: number;
  jti: string;
}

