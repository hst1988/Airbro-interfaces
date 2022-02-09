import { ethereumService } from "@/main";

const initialState = () => ({
  errors: [],
  isTarnsationSuccess: false,
  isTransactionFinished: true,
  txHash: "",
  tokenToSendComponent: "SendNft",
});
const state = initialState();

const getters = {
  getByKey: (state) => (key) => state[key],
  getErrors(state) {
    return state.errors;
  },
  getIsTransactionFinished(state) {
    return state.isTransactionFinished;
  },
  getIsTarnsationSuccess(state) {
    return state.isTarnsationSuccess;
  },
  getTxHash(state) {
    return state.txHash;
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
  setIsTransactionFinished(state, isTransactionFinished) {
    state.isTransactionFinished = isTransactionFinished;
  },
  setIsTarnsationSuccess(state, isTarnsationSuccess) {
    state.isTarnsationSuccess = isTarnsationSuccess;
  },
  setTxHash(state, txHash) {
    state.txHash = txHash;
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

  async rewardNftToNftHolders(
    { commit },
    {
      rewardedNftCollection,
      newNftCollectionName,
      newNftCollectionSymbol,
      newNftSupply,
      baseUri,
    }
  ) {
    try {
      commit("setIsTransactionFinished", false);
      const txHash = await ethereumService.dropNftsToNftHolders(
        rewardedNftCollection,
        newNftCollectionName,
        newNftCollectionSymbol,
        newNftSupply,
        baseUri
      );
      commit("setTxHash", txHash.hash);
      return txHash;
    } catch (error) {
      commit("pushError", error);
    }
  },

  async dropNewTokensToNftHolders(
    { commit },
    { rewardedNftCollection, newTokenName, newTokenSymbol, newTokenSypply }
  ) {
    try {
      commit("setIsTransactionFinished", false);
      const txHash = await ethereumService.dropNewTokensToNftHolders(
        rewardedNftCollection,
        newTokenName,
        newTokenSymbol,
        newTokenSypply
      );
      commit("setTxHash", txHash.hash);
      return txHash;
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
