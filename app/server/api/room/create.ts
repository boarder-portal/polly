import { ObjectId } from 'mongodb';

import { Middleware } from 'server/types/koa';

import RoomModel, { Room } from 'server/db/models/room';

export interface CreateRoomRequest {
  name: string;
  members: string[];
}

export interface CreateRoomResponse {
  room: Room;
}

export const createRoom: Middleware<CreateRoomResponse> = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    return ctx.throw(401);
  }

  const { name, members }: CreateRoomRequest = ctx.request.body;

  const room = await RoomModel.create({
    name,
    members: [user.id, ...members].map((id) => new ObjectId(id)),
  });

  ctx.body = {
    room: await room.toData(),
  };
};

export default createRoom;
