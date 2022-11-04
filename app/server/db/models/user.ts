import { hash, verify } from 'argon2';
import { Schema } from 'mongoose';

import db from 'server/db';

export interface UserData {
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
      toData(): UserData {
        return {
          id: String(this._id),
          login: this.login ?? '',
        };
      },
      async validatePassword(password): Promise<boolean> {
        return verify(password, this.password ?? '');
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

const User = db.model('user', userSchema, 'users');

export default User;
