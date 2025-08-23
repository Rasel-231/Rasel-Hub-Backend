export type ILogin = {
  userId: string;
};

export type ILoginRequest = {
  userId: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
export type ILoginResponse = {
  userId: string;
  token: string;
  refreshToken: string;
  message?: string;
};
