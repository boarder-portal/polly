import { Middleware } from 'server/types/koa';

import { getOwnRooms, Room } from 'server/db/models/room';

export interface GetAllRoomsResponse {
  rooms: Room[];
}

export const getAllRooms: Middleware<GetAllRoomsResponse> = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    return ctx.throw(401);
  }

  const userRooms = await getOwnRooms(user.id);

  ctx.body = {
    rooms: await Promise.all(userRooms.map((room) => room.toData())),
  };
};

export default getAllRooms;
