import type { ParameterizedContext } from 'koa';
import type { IRouterParamContext } from 'koa-router';
import session from 'koa-session';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RestContext<Body = any, State = any> = ParameterizedContext<
  State,
  IRouterParamContext & { session: session.Session },
  Body
>;
