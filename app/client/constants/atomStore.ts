import AtomStore from 'common/utilities/AtomStore';

const atomValues = window.__ATOM_VALUES__;

delete window.__ATOM_VALUES__;

export default new AtomStore(atomValues);
