export interface User {
  name: string;
  github: string;
  avatar_url: string;
}

export type GetTokenResponse = { access_token: string } | { error: string };
export interface OAuth2Strategy {
  getToken: (code: string) => Promise<string>;
  getProfile: (access_token: string) => Promise<User>;
  authorizeURL: (state: string) => string;
}
