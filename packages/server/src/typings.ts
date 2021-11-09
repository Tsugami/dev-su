import type { ParameterizedContext } from 'koa';
import type { IRouterParamContext } from 'koa-router';

export type RestContext<Body = {}, State = {}> = ParameterizedContext<
  State,
  IRouterParamContext,
  Body
>;
