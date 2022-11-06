import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';

import { Context, State } from 'server/types/koa';

import authRouter from 'server/api/auth';
import roomRouter from 'server/api/room';
import userRouter from 'server/api/user';

const apiRouter = new Router<State, Context>({
  prefix: '/api',
});

apiRouter.use(bodyParser());

apiRouter.use('/auth', authRouter.routes(), authRouter.allowedMethods());
apiRouter.use('/room', roomRouter.routes(), roomRouter.allowedMethods());
apiRouter.use('/user', userRouter.routes(), userRouter.allowedMethods());

export default apiRouter;
