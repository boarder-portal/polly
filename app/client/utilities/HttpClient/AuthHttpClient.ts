import { RegisterRequest, RegisterResponse } from 'server/api/auth/register';

import HttpClient from './HttpClient';

class AuthHttpClient extends HttpClient {
  getBaseUrl(): string {
    return `${super.getBaseUrl()}/auth`;
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.post('/register', request);
  }
}

export default new AuthHttpClient();
