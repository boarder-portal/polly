import { USER_COOKIE_NAME } from 'server/constants/auth';

import { Middleware } from 'server/types/koa';

import UserModel, { User } from 'server/db/models/user';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

const login: Middleware<LoginResponse> = async (ctx) => {
  const { login, password }: LoginRequest = ctx.request.body;

  const user = await UserModel.findOne({ login });

  if (!user) {
    return ctx.throw(400);
  }

  const isSamePassword = await user.validatePassword(password);

  if (!isSamePassword) {
    return ctx.throw(400);
  }

  ctx.cookies.set(USER_COOKIE_NAME, user.getId(), {
    expires: new Date(2030, 1),
  });

  ctx.body = {
    user: user.toData(),
  };
};

export default login;
