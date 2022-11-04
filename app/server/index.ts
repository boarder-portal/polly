import path from 'node:path';

import { createReadStream } from 'fs';
import serve from 'koa-static';
import mount from 'koa-mount';

import { USER_COOKIE_NAME } from 'server/constants/auth';

import User from 'server/db/models/user';

import { app, server } from 'server/server';
import api from 'server/api';

const indexHtmlPath = path.resolve('./dist/index.html');

const PORT = 7654;

app.use(
  mount(
    '/public',
    serve(path.resolve('./dist'), {
      gzip: true,
    }),
  ),
);
app.use(async (ctx, next) => {
  const userId = ctx.cookies.get(USER_COOKIE_NAME);

  ctx.state.user = userId ? (await User.findById(userId))?.toData() ?? null : null;

  await next();
});
app.use(api.routes());
app.use(api.allowedMethods());
app.use(async (ctx) => {
  console.log(ctx.state.user);

  ctx.type = 'text/html';
  ctx.body = createReadStream(indexHtmlPath);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}...`);
});
