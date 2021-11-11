import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import session from 'koa-session';
import cors from '@koa/cors';

import schema from './graphql/schema';
import buildContext from './graphql/buildContext';
import SignInPost from './modules/auth/routes/SignInPost';
import { RestContext } from 'typings';
import AuthorizedPost from './modules/auth/routes/AuthorizedPost';
import CallbackPost from './modules/auth/routes/CallbackPost';

const app = new Koa();
const router = new Router();

router.all(
  '/graphql',
  graphqlHTTP(async (req) => ({
    schema,
    graphiql: true,
    context: await buildContext(req),
  })),
);

router.all('/auth/signin/github', (ctx) => SignInPost(ctx as RestContext));
router.all('/auth/callback/github', (ctx) => AuthorizedPost(ctx as RestContext));
router.all('/auth/signup', (ctx) => CallbackPost(ctx as RestContext));

app.keys = [process.env.SESSION_SECRET as string];

app.use(cors());
app.use(session(app));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
