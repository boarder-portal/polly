import { hash, verify } from 'argon2';
import { Schema } from 'mongoose';
import escapeRegExp from 'lodash/escapeRegExp';

import { ModelInstance } from 'server/types/mongoose';

import db from 'server/db';

export interface User {
  id: string;
  login: string;
  password?: never;
}

const userSchema = new Schema(
  {
    login: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    methods: {
      getId(): string {
        return String(this._id);
      },
      toData(): User {
        return {
          id: String(this._id),
          login: this.login ?? '',
        };
      },
      async validatePassword(password): Promise<boolean> {
        return verify(this.password ?? '', password);
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await hash(this.password ?? '');

    return next();
  } catch (err) {
    return next(err instanceof Error ? err : new Error('Hash failed'));
  }
});

const UserModel = db.model('user', userSchema, 'users');

export async function searchByQuery(query: string): Promise<UserDbInstance[]> {
  return UserModel.find({
    login: new RegExp(escapeRegExp(query), 'i'),
  })
    .limit(5)
    .exec();
}

export type UserDbInstance = ModelInstance<typeof UserModel>;

export default UserModel;
