import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import session from 'koa-session';
import cors from '@koa/cors';

import schema from './graphql/schema';
import buildContext from './graphql/buildContext';
import SignInGithubPost from './modules/auth/routes/SignInGithubPost';

const app = new Koa();
const router = new Router();

router.all(
  '/graphql',
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
    context: buildContext(),
  })),
);

router.all('/auth/callback/github', SignInGithubPost);

app.keys = [process.env.SESSION_SECRET as string];

app.use(cors());
app.use(session(app));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
