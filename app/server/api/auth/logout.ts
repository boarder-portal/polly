import { USER_COOKIE_NAME } from 'server/constants/auth';

import { Middleware } from 'server/types/koa';

const logout: Middleware = async (ctx) => {
  ctx.cookies.set(USER_COOKIE_NAME, null);

  ctx.body = {};
};

export default logout;
