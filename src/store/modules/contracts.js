import { ethereumService } from "@/main";

const initialState = () => ({
  errors: [],
  address: "",
  balance: {},
  network: {},
  networkName: "",
});
const state = initialState();

const getters = {
  getErrors(state) {
    return state.errors;
  },
  getAddress(state) {
    return state.address;
  },
  getBalance(state) {
    return state.balance;
  },
  getNetwork(state) {
    return state.network;
  },
  getNetworkName(state) {
    return state.networkName;
  },
};
const mutations = {
  pushError(state, error) {
    state.errors.push(error);
  },
  clearErrors(state) {
    state.errors.splice(0);
  },
  setAddress(state, address) {
    state.address = address;
  },
  setBalance(state, balance) {
    state.balance = balance;
  },
  setNetwork(state, network) {
    state.network = network;
  },
  setNetworkName(state, networkName) {
    state.networkName = networkName;
  },
  resetState(state) {
    Object.assign(state, initialState());
  },
};

const actions = {
  async fetchAddress({ commit }) {
    try {
      const address = await ethereumService.fetchAddress();
      commit("setAddress", address);
      return address;
    } catch (error) {
      commit("pushError", error);
    }
  },
  async fetchBalance({ commit }, balanceAddress) {
    try {
      const balance = await ethereumService.fetchBalance(balanceAddress);
      commit("setBalance", balance);
      return balance;
    } catch (error) {
      commit("pushError", error);
    }
  },
  async signNonce({ commit }, nonce) {
    try {
      return await ethereumService.signNonce(nonce);
    } catch (error) {
      if ("code" in error && error.code === 4001) {
        return "rejected";
      }
      commit("pushError", error);
    }
  },

  async fetchNetwork({ commit }) {
    try {
      const result = await ethereumService.getNetwork();
      commit("setNetwork", result);
    } catch (error) {
      commit("pushError", error);
    }
  },
  async resetState({ commit }) {
    commit("resetState");
  },

  async fetchNetworkName({ commit }) {
    try {
      const result = await ethereumService.getNetworkName();
      commit("setNetworkName", result);
    } catch (error) {
      commit("pushError", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
