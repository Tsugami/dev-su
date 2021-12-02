import axios from 'axios';
import { OAuth2Strategy, GetTokenResponse } from './OAuth';

const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_PROFILE_URI = 'https://api.github.com/user';
const GITHUB_AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize';

const GITHUB_AUTHORIZATION_PARAMS = {
  scope: 'user',
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
};

function encodeStrToObj<A>(str: string): A {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.fromEntries(new URLSearchParams(str));
}

interface GithubUser {
  name: string;
  login: string;
  email: string;
  avatar_url: string;
}

const GithubOAuth: OAuth2Strategy = {
  getProfile: async (accessToken) => {
    const rest = await axios.get<GithubUser>(GITHUB_PROFILE_URI, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    return { ...rest.data, github: rest.data.login };
  },
  getToken: async (code) => {
    const uri = axios.getUri({
      url: GITHUB_ACCESS_TOKEN_URL,
      params: {
        code,
        scope: 'user',
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
      },
    });

    const rest = await axios.post(uri);

    const data = encodeStrToObj<GetTokenResponse>(rest.data);

    if ('access_token' in data) {
      return data.access_token;
    }

    throw new Error(data.error);
  },
  authorizeURL: (state) => {
    return axios.getUri({
      url: GITHUB_AUTHORIZATION_URL,
      params: {
        state,
        ...GITHUB_AUTHORIZATION_PARAMS,
      },
    });
  },
};

export default GithubOAuth;
