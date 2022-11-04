import { USER_COOKIE_NAME } from 'server/constants/auth';

import { Middleware } from 'server/types/koa';

import User, { UserData } from 'server/db/models/user';

export interface RegisterRequest {
  login: string;
  password: string;
}

export interface RegisterResponse {
  user: UserData;
}

const register: Middleware<RegisterResponse> = async (ctx) => {
  const { login, password }: RegisterRequest = ctx.request.body;

  const userWithLogin = await User.findOne({ login });

  if (userWithLogin) {
    return ctx.throw(409);
  }

  const user = new User({
    login,
    password,
  });

  await user.save();

  ctx.cookies.set(USER_COOKIE_NAME, user.getId(), {
    expires: new Date(2030, 1),
  });

  ctx.body = {
    user: user.toData(),
  };
};

export default register;
