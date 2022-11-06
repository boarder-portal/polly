import HttpClient from 'client/utilities/HttpClient/HttpClient';

import { CreateRoomRequest, CreateRoomResponse } from 'server/api/room/create';
import { GetAllRoomsResponse } from 'server/api/room/getAll';

class RoomHttpClient extends HttpClient {
  protected getBaseUrl(): string {
    return `${super.getBaseUrl()}/room`;
  }

  create(request: CreateRoomRequest, signal?: AbortSignal): Promise<CreateRoomResponse> {
    return this.post('/create', request, signal);
  }

  getAll(signal?: AbortSignal): Promise<GetAllRoomsResponse> {
    return this.get('/getAll', undefined, signal);
  }
}

export default new RoomHttpClient();
