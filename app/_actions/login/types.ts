export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface RefreshAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPasswordRequest {
  password: string;
  token: string;
}