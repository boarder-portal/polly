import { User } from 'server/db/models/user';

export interface AtomValues {
  user: User | null;
}

export type AtomKey = keyof AtomValues;

export type AtomValue<Key extends AtomKey> = AtomValues[Key];

export type OptionalAtomValue<Key extends AtomKey> = AtomValue<Key> | undefined;

export type AtomSubscriber<Key extends AtomKey> = (value: AtomValue<Key>) => unknown;

export type AtomsJson = Partial<{
  [Key in AtomKey]: AtomValue<Key>;
}>;

class Atom<Key extends AtomKey, Value extends OptionalAtomValue<Key> = OptionalAtomValue<Key>> {
  readonly key: Key;
  #value: Value;
  #subscribers = new Set<AtomSubscriber<Key>>();

  constructor(key: Key, initialValue: Value) {
    this.key = key;
    this.#value = initialValue;
  }

  getValue(): Value {
    return this.#value;
  }

  setValue(value: AtomValue<Key> | ((value: Value) => AtomValue<Key>)): void {
    const newValue = typeof value === 'function' ? value(this.#value) : value;

    this.#value = newValue as any;

    for (const subscriber of this.#subscribers) {
      subscriber(newValue);
    }
  }

  subscribe(subscriber: AtomSubscriber<Key>): () => void {
    this.#subscribers.add(subscriber);

    return () => {
      this.#subscribers.delete(subscriber);
    };
  }
}

export default Atom;
