import { AtomsJson } from 'common/utilities/Atom';

declare global {
  interface Window {
    __ATOM_VALUES__?: AtomsJson;
  }
}
