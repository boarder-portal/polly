import forEach from 'lodash/forEach';

export interface AtomValues {}

export type AtomKey = keyof AtomValues;

export type AtomValue<Key extends AtomKey> = AtomValues[Key];

export type AtomSubscriber<Key extends AtomKey> = (value: AtomValue<Key>) => unknown;

export type AtomsJson = Partial<{
  [Key in AtomKey]: AtomValue<Key>;
}>;

class Atom<Key extends AtomKey> {
  static #values: Partial<{
    [Key in AtomKey]: AtomValue<Key>;
  }> = {};

  static loadFromJSON(json: AtomsJson): void {
    Object.assign(this.#values, json);
  }

  static toJSON(): AtomsJson {
    const json: AtomsJson = {};

    forEach(this.#values, (value, key) => {
      if (value !== undefined) {
        json[key as AtomKey] = value;
      }
    });

    return json;
  }

  readonly key: Key;
  #value: AtomValue<Key>;
  #subscribers = new Set<AtomSubscriber<Key>>();

  constructor(key: Key, defaultValue: AtomValue<Key>) {
    const storedValue = Atom.#values[key];
    const value = storedValue === undefined ? defaultValue : storedValue;

    this.key = key;
    this.#value = value;

    Atom.#values[key] = value;
  }

  getValue(): AtomValue<Key> {
    return this.#value;
  }

  setValue(value: AtomValue<Key> | ((value: AtomValue<Key>) => AtomValue<Key>)): void {
    const newValue = typeof value === 'function' ? value(this.#value) : value;

    this.#value = newValue;
    Atom.#values[this.key] = newValue;

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
