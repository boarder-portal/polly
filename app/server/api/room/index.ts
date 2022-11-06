import Router from '@koa/router';

import { Context, State } from 'server/types/koa';

import createRoom from 'server/api/room/create';
import getAllRooms from 'server/api/room/getAll';

const roomRouter = new Router<State, Context>();

roomRouter.post('/create', createRoom);
roomRouter.get('/getAll', getAllRooms);

export default roomRouter;
