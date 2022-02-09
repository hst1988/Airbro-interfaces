const initialState = () => ({
  errors: [],
  newTokenName: "",
  newTokenSymbol: "",
  newTokenSupply: "",
});
const state = initialState();

const getters = {
  getByKey: (state) => (key) => state[key],
  getErrors(state) {
    return state.errors;
  },
};
const mutations = {
  commitByKey(state, object) {
    Object.keys(object).forEach((key) => (state[key] = object[key]));
  },
  setByKey({ commit }, obj) {
    commit("setByKey", obj);
  },
  pushError(state, error) {
    state.errors.push(error);
  },
  clearErrors(state) {
    state.errors.splice(0);
  },
  resetState(state) {
    Object.assign(state, initialState());
  },
};
const actions = {
  resetState({ commit }) {
    commit("resetState");
  },
  commitByKey({ commit }, object) {
    commit("commitByKey", object);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
