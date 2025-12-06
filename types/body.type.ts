export type LoginDto = {
  username: string;
  password: string;
};

export type LoginResType = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};