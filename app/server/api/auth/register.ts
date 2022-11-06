import { USER_COOKIE_NAME } from 'server/constants/auth';

import { Middleware } from 'server/types/koa';

import UserModel, { User } from 'server/db/models/user';

export interface RegisterRequest {
  login: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

const register: Middleware<RegisterResponse> = async (ctx) => {
  const { login, password }: RegisterRequest = ctx.request.body;

  const userWithLogin = await UserModel.findOne({ login });

  if (userWithLogin) {
    return ctx.throw(409);
  }

  const user = await UserModel.create({
    login,
    password,
  });

  ctx.cookies.set(USER_COOKIE_NAME, user.getId(), {
    expires: new Date(2030, 1),
  });

  ctx.body = {
    user: user.toData(),
  };
};

export default register;
