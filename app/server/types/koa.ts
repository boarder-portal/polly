import { Middleware as KoaMiddleware, ParameterizedContext } from 'koa';

import { UserData } from 'server/db/models/user';

export interface State {
  user: UserData | null;
}

export type Context<Body = unknown> = ParameterizedContext<State, {}, Body>;

export type Middleware<Body = unknown> = KoaMiddleware<State, Context, Body>;

export type Query<Payload extends object> = {
  [K in keyof Payload]?: string | string[];
};
