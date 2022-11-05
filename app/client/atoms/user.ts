import Atom from 'client/utilities/Atom';

import { User } from 'server/db/models/user';

declare module 'client/utilities/Atom' {
  export interface AtomValues {
    user: User | null;
  }
}

export const userAtom = new Atom('user', null);
