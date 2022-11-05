import { RegisterRequest, RegisterResponse } from 'server/api/auth/register';
import { LoginRequest, LoginResponse } from 'server/api/auth/login';

import HttpClient from './HttpClient';

class AuthHttpClient extends HttpClient {
  getBaseUrl(): string {
    return `${super.getBaseUrl()}/auth`;
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    return this.post('/register', request);
  }

  async logout(): Promise<void> {
    return this.post('/logout');
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.post('/login', request);
  }
}

export default new AuthHttpClient();
