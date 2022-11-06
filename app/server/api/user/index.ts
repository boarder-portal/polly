import Router from '@koa/router';

import { Context, State } from 'server/types/koa';

import searchUser from 'server/api/user/search';

const userRouter = new Router<State, Context>();

userRouter.get('/search', searchUser);

export default userRouter;
