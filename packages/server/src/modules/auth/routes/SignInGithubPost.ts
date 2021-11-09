import axios from 'axios';
import UserModel from '../../user/UserModel';
import { RestContext } from '../../../typings';
import { generateToken } from '../AuthControll';

const GITHUB_CONFIG = {
  params: {
    scope: 'user',
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  },
  accessTokenUrl: 'https://github.com/login/oauth/access_token',
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  profileUrl: 'https://api.github.com/user',
};

export type TokenResponse =
  | {
      access_token: string;
      scope: string;
      token_type: string;
    }
  | {
      error: string;
      error_description: string;
      error_uri: string;
    };

const defaultHttpHeaders = {
  Accept: 'application/json',
};

function encodeStrToObj<A>(str: string): A {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.fromEntries(new URLSearchParams(str));
}

async function getGithubAccessToken({ code }: { code: string }): Promise<TokenResponse> {
  const uri = axios.getUri({
    url: GITHUB_CONFIG.accessTokenUrl,
    params: {
      code,
      ...GITHUB_CONFIG.params,
    },
  });

  const rest = await axios.post(uri, {
    headers: defaultHttpHeaders,
  });

  return encodeStrToObj(rest.data);
}

interface GithubUser {
  name: string;
  login: string;
  email: string;
  avatar_url: string;
}

interface User {
  name: string;
  github: string;
  email: string;
  avatar_url: string;
}

async function getGithubProfile(accessToken: string): Promise<User> {
  const rest = await axios.get<GithubUser>(GITHUB_CONFIG.profileUrl, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  return { ...rest.data, github: rest.data.login };
}

export default async function SignInGithubPost(ctx: RestContext) {
  const code = ctx.query.code as string;

  if (!code) {
    ctx.throw(400, 'Missing code');
  }

  const data = await getGithubAccessToken({ code });

  if ('error' in data) {
    return ctx.throw(400, data.error_description);
  }

  const profile = await getGithubProfile(data.access_token);
  const user =
    (await UserModel.findOne({ github: profile.github })) ?? (await UserModel.create(profile));

  ctx.body = {
    token: generateToken(user.id),
    user: {
      id: user.id,
      name: user.name,
      avatar_url: user.avatar_url,
    },
  };
  ctx.status = 200;
}
