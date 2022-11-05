import { AtomsJson } from 'client/utilities/Atom';

declare global {
  interface Window {
    __ATOM_VALUES__?: AtomsJson;
  }
}
