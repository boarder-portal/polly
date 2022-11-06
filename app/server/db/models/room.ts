import { Schema } from 'mongoose';

import { isDefined } from 'common/utilities/is';

import UserModel, { User } from 'server/db/models/user';

import db from 'server/db';

export interface Room {
  id: string;
  name: string;
  members: User[];
}

const roomSchema = new Schema(
  {
    name: String,
    members: [Schema.Types.ObjectId],
  },
  {
    methods: {
      getId(): string {
        return String(this._id);
      },
      async toData(): Promise<Room> {
        const members = await Promise.all(this.members.map((userId) => UserModel.findById(userId)));

        if (!members.every(isDefined)) {
          throw new Error('Unknown members');
        }

        return {
          id: String(this._id),
          name: this.name ?? '',
          members: members.map((user) => user.toData()),
        };
      },
    },
  },
);

const RoomModel = db.model('room', roomSchema, 'rooms');

export default RoomModel;
