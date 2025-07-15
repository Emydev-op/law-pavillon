export type User = {
  id?: number;
  name?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
};

interface TokenData {
  user_id?: number;
  user_type?: string;
  access_token?: string;
  refresh_token?: string;
  access_expires_at?: string;
  refresh_expires_at?: string;
}

export type Auth = {
  user: User;
  token: TokenData;
};
