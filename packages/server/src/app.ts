import Koa from 'koa';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import session from 'koa-session';
import cors from '@koa/cors';

import schema from './graphql/schema';
import buildContext from './graphql/buildContext';
import { GraphQLError } from 'graphql';

const app = new Koa();
const router = new Router();

router.all('/graphql', (ctx, next) => {
  return graphqlHTTP(async (_req, _res, ctx) => ({
    schema,
    graphiql: true,
    context: await buildContext(ctx),
    formatError: (error: GraphQLError) => {
      // eslint-disable-next-line
      console.log(error.message);
      // eslint-disable-next-line
      console.log(error.locations);
      // eslint-disable-next-line
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  }))(ctx, next);
});

app.keys = [process.env.SESSION_SECRET as string];

app.use(cors());
app.use(session(app));
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
