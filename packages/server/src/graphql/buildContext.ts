import type { RestContext } from '../typings';

import { getUserIDByAccessToken } from '../modules/auth/AuthControl';

import PostLoader from '../modules/post/PostLoader';
import UserLoader from '../modules/user/UserLoader';

function buildDataloaders() {
  return {
    PostLoader: PostLoader.getLoader(),
    UserLoader: UserLoader.getLoader(),
  };
}

export default async function buildContext(ctx: RestContext) {
  const dataloaders = buildDataloaders();

  const accessToken = ctx.headers.authorization ?? ctx.session.token;
  const userID = accessToken
    ? await getUserIDByAccessToken(accessToken as string).catch(() => null)
    : null;

  const user = userID ? await dataloaders.UserLoader.load(userID) : null;

  return {
    userID,
    dataloaders,
    user,
  };
}

type ReturnPromise<T> = T extends Promise<infer U> ? U : T;

export type GraphQLContext = ReturnPromise<ReturnType<typeof buildContext>>;
