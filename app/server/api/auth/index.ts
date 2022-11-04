import Router from '@koa/router';

import { Context, State } from 'server/types/koa';

import register from 'server/api/auth/register';

const authRouter = new Router<State, Context>();

authRouter.post('/register', register);

export default authRouter;
