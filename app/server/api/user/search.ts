import { Middleware, Query } from 'server/types/koa';

import { searchByQuery, User } from 'server/db/models/user';

export interface SearchUserRequest {
  query: string;
}

export interface SearchUserResponse {
  users: User[];
}

export const searchUser: Middleware<SearchUserResponse> = async (ctx) => {
  const { query }: Query<SearchUserRequest> = ctx.query;

  const users = await searchByQuery(String(query));

  ctx.body = {
    users: users.map((user) => user.toData()),
  };
};

export default searchUser;
