import Atom from 'client/utilities/Atom';

if (window.__ATOM_VALUES__) {
  Atom.loadFromJSON(window.__ATOM_VALUES__);
}
