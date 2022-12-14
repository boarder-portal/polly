import fs from 'node:fs/promises';
import path from 'node:path';

import serve from 'koa-static';
import mount from 'koa-mount';

import { USER_COOKIE_NAME } from 'server/constants/auth';

import SharedStore from 'common/utilities/SharedStore';

import UserModel from 'server/db/models/user';

import { app, server } from 'server/server';
import api from 'server/api';

const indexHtmlPath = path.resolve('./dist/index.html');
let indexHtmlContents = '';

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

  ctx.state.user = userId ? (await UserModel.findById(userId))?.toData() ?? null : null;

  await next();
});
app.use(api.routes());
app.use(api.allowedMethods());
app.use(async (ctx) => {
  const sharedStore = new SharedStore();

  sharedStore.setValue('user', ctx.state.user);

  ctx.type = 'text/html';
  ctx.body = indexHtmlContents.replace(
    '"__STORE_VALUES__"',
    `
    window.__STORE_VALUES__ = ${JSON.stringify(sharedStore.toJSON()).replace(/</g, '\\u003c')};
  `,
  );
});

(async () => {
  indexHtmlContents = await fs.readFile(indexHtmlPath, 'utf8');

  await new Promise<void>((resolve) => {
    server.listen(PORT, resolve);
  });

  console.log(`Listening on http://localhost:${PORT}...`);
})().catch((err) => {
  console.log(err);

  process.exit(1);
});
