import next from 'next';
import { loadEnvConfig } from '@next/env';

import Koa from 'koa';
import Router from '@koa/router';
import graphqlHTTP from 'koa-graphql';
import schema from './graphql/schema';
import mongoose from 'mongoose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();

  router.all(
    '/api/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

  router.all('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());

  await mongoose.connect(process.env.MONGO_URI as string, {
    dbName: process.env.NODE_ENV === 'development' ? 'dev-su' : undefined,
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
