import HttpClient from 'client/utilities/HttpClient/HttpClient';

import { SearchUserRequest, SearchUserResponse } from 'server/api/user/search';

class UserHttpClient extends HttpClient {
  protected getBaseUrl(): string {
    return `${super.getBaseUrl()}/user`;
  }

  search(request: SearchUserRequest, signal?: AbortSignal): Promise<SearchUserResponse> {
    return this.get('/search', request, signal);
  }
}

export default new UserHttpClient();
