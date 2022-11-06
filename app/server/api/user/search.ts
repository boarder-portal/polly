import escapeRegExp from 'lodash/escapeRegExp';

import { Middleware, Query } from 'server/types/koa';

import UserModel, { User } from 'server/db/models/user';

export interface SearchUserRequest {
  query: string;
}

export interface SearchUserResponse {
  users: User[];
}

export const searchUser: Middleware<SearchUserResponse> = async (ctx) => {
  const { query }: Query<SearchUserRequest> = ctx.query;
  const queryString = String(query);

  const users = await UserModel.find({
    login: new RegExp(escapeRegExp(queryString), 'i'),
  })
    .limit(5)
    .exec();

  ctx.body = {
    users: users.map((user) => user.toData()),
  };
};

export default searchUser;
