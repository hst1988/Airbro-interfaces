import Moralis from "@/plugins/moralis";

const initialState = () => ({
  nftListTotal: "",
  nftList: [],
  giftCollectionName: "",
  giftCollectionSymbol: "",
  tableNftItems: [],
  addresesToReward: [],
  tableAddressesToRewardList: [],
  addresesToRewardTotalItems: [],
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
  getGiftCollectionName(state) {
    return state.giftCollectionName;
  },
  getGiftCollectionSymbol(state) {
    return state.giftCollectionSymbol;
  },
  getNftListTotal(state) {
    return state.nftListTotal;
  },
  getTableNftItems(state) {
    return state.tableNftItems;
  },
  getAddressesToReward(state) {
    return state.addresesToReward;
  },
  getTableAddressesToRewardList(state) {
    return state.tableAddressesToRewardList;
  },
  getAddresesToRewardTotalItems(state) {
    return state.addresesToRewardTotalItems;
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
  setGiftCollectionName(state, giftCollectionName) {
    state.giftCollectionName = giftCollectionName;
  },
  setGiftCollectionSymbol(state, giftCollectionSymbol) {
    state.giftCollectionSymbol = giftCollectionSymbol;
  },
  setNftListTotal(state, nftListTotal) {
    state.nftListTotal = nftListTotal;
  },
  setTableNftItems(state, tableNftItems) {
    state.tableNftItems.push(tableNftItems);
  },
  setAddressesToReward(state, addresesToReward) {
    state.addresesToReward.push(addresesToReward);
  },
  setTableAddressesToRewardList(state, tableAddressesToRewardList) {
    state.tableAddressesToRewardList.push(tableAddressesToRewardList);
  },
  setAddresesToRewardTotalItems(state, addresesToRewardTotalItems) {
    state.addresesToRewardTotalItems.push(addresesToRewardTotalItems);
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
      commit("setNftList", response.result);
      commit("setNftListTotal", response.total);
      commit("setGiftCollectionName", response.result[0].name);
      commit("setGiftCollectionSymbol", response.result[0].symbol);
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
            commit("setTableNftItems", {
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
  async fetchAddresesToReward({ commit }, options) {
    try {
      const response = await Moralis.Web3API.token.getAllTokenIds(options);
      commit("setAddressesToReward", response.result[0].token_address);
      commit("setAddresesToRewardTotalItems", response.total);
      commit("setTableAddressesToRewardList", {
        Collection_Name: response.result[0].name,
        Collection_Address: response.result[0].token_address,
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
