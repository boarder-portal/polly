import useAtom from 'client/hooks/useAtom';

import { User } from 'server/db/models/user';

import { userAtom } from 'client/atoms/user';

export default function useUser(): User | null {
  return useAtom(userAtom).value;
}
