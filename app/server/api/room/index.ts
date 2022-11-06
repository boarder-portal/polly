import Router from '@koa/router';

import { Context, State } from 'server/types/koa';

import createRoom from 'server/api/room/create';

const roomRouter = new Router<State, Context>();

roomRouter.post('/create', createRoom);

export default roomRouter;
