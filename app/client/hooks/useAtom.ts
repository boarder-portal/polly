import { useEffect, useState } from 'react';

import Atom, { AtomKey, AtomValue, OptionalAtomValue } from 'common/utilities/Atom';

import useImmutableCallback from 'client/hooks/useImmutableCallback';

export interface UseAtom<Key extends AtomKey, Value extends OptionalAtomValue<Key>> {
  value: Value;
  setValue(value: AtomValue<Key> | ((value: Value) => AtomValue<Key>)): void;
}

export default function useAtom<Key extends AtomKey, Value extends OptionalAtomValue<Key>>(
  atom: Atom<Key, Value>,
): UseAtom<Key, Value> {
  const [value, setValue] = useState<Value>(atom.getValue());

  useEffect(() => {
    return atom.subscribe(setValue as any);
  }, [atom]);

  return {
    value,
    setValue: useImmutableCallback((value) => {
      atom.setValue(value);
    }),
  };
}
