import Moralis from "@/plugins/moralis";
// import api from "../plugins/apiWrapper";

const initialState = () => ({
  nftListTotal: {},
  nftList: [],
  tableItems: [],
  errors: [],
});
const state = initialState();

const getters = {
  getErrors(state) {
    return state.errors;
  },
  getNftList(state) {
    return state.nftList;
  },
  getNftListTotal(state) {
    return state.nftListTotal;
  },
  getTableItems(state) {
    return state.tableItems;
  },
};

const mutations = {
  pushError(state, error) {
    state.errors.push(error);
  },
  clearErrors(state) {
    state.errors.splice(0);
  },
  setNftList(state, nftList) {
    state.nftList = nftList;
  },
  setNftListTotal(state, nftListTotal) {
    state.nftListTotal = nftListTotal;
  },
  setTableItems(state, tableItems) {
    state.tableItems.push(tableItems);
  },
  resetState(state) {
    Object.assign(state, initialState());
  },
};

const actions = {
  resetState({ commit }) {
    commit("resetState");
  },
  async fetchNft({ commit }, options) {
    try {
      const response = await Moralis.Web3API.account.getNFTs(options);
      commit("setNftList", { nftList: response.result });
      commit("setNftListTotal", { nftListTotal: response.total });
      const fixUrl = (url) => {
        if (url.startsWith("ipfs")) {
          return (
            "https://ipfs.moralis.io:2053/ipfs/" +
            url.split("ipfs://ipfs/").splice(-1)
          );
        } else {
          return url + "?format=json";
        }
      };
      const truncateString = (str, num) => {
        if (str.length > num) {
          return str.slice(0, num) + "...";
        } else {
          return str;
        }
      };
      response.result.forEach((nft) => {
        let url = fixUrl(nft.token_uri);
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            commit("setTableItems", {
              Item_name: data.name,
              Collection_name: nft.name,
              NFT_ID: truncateString(nft.token_id, 5),
            });
          });
      });
      return response;
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
