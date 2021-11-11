import { Request } from 'koa';

import { getUserIDByAccessToken } from '../modules/auth/AuthControll';

import PostLoader from '../modules/post/PostLoader';
import UserLoader from '../modules/user/UserLoader';

function buildDataloaders() {
  return {
    PostLoader: PostLoader.getLoader(),
    UserLoader: UserLoader.getLoader(),
  };
}

export default async function buildContext(req: Request) {
  const dataloaders = buildDataloaders();

  const userID = req.headers.authorization
    ? await getUserIDByAccessToken(req.headers.authorization as string).catch(() => null)
    : null;

  return {
    dataloaders,
    userID,
  };
}

type ReturnPromise<T> = T extends Promise<infer U> ? U : T;

export type GraphQLContext = ReturnPromise<ReturnType<typeof buildContext>>;
