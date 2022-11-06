import forEach from 'lodash/forEach';

import Atom, { AtomKey, AtomValue, OptionalAtomValue } from 'common/utilities/Atom';

export type AtomsJson = Partial<{
  [Key in AtomKey]: AtomValue<Key>;
}>;

class AtomStore {
  #atoms: Partial<{
    [Key in AtomKey]: Atom<Key>;
  }> = {};

  constructor(json?: AtomsJson) {
    if (json) {
      forEach(json, (value, key) => {
        if (value !== undefined) {
          this.#atoms[key as AtomKey] = this.atom(key as AtomKey, value);
        }
      });
    }
  }

  atom<Key extends AtomKey, Value extends OptionalAtomValue<Key>>(key: Key): Atom<Key, Value>;
  atom<Key extends AtomKey, Value extends AtomValue<Key>>(key: Key, initialValue: AtomValue<Key>): Atom<Key, Value>;
  atom<Key extends AtomKey, Value extends OptionalAtomValue<Key>>(
    key: Key,
    initialValue?: AtomValue<Key>,
  ): Atom<Key, Value> {
    const existingAtom = this.#atoms[key];

    if (existingAtom) {
      if (existingAtom.getValue() === undefined && initialValue !== undefined) {
        existingAtom.setValue(initialValue);
      }

      return existingAtom as any;
    }

    const atom = new Atom(key, initialValue);

    this.#atoms[key] = atom as any;

    return atom as any;
  }

  toJSON(): AtomsJson {
    const json: AtomsJson = {};

    forEach(this.#atoms, (atom) => {
      if (atom !== undefined) {
        json[atom.key] = atom.getValue();
      }
    });

    return json;
  }
}

export default AtomStore;
