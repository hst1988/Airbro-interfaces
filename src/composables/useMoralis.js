import { computed } from "vue";

const useMoralis = (store) => {
  const nftList = computed(() => store.getters["moralis/getNftList"]);
  const giftCollectionName = computed(
    () => store.getters["moralis/getGiftCollectionName"]
  );
  const giftCollectionSymbol = computed(
    () => store.getters["moralis/getGiftCollectionSymbol"]
  );
  const tableNftItems = computed(
    () => store.getters["moralis/getTableNftItems"]
  );
  const nftListTotal = computed(() => store.getters["moralis/getNftListTotal"]);
  const addresesToReward = computed(
    () => store.getters["moralis/getAddressesToReward"]
  );
  const tableAddressesToRewardList = computed(
    () => store.getters["moralis/getTableAddressesToRewardList"]
  );
  const addresesToRewardTotalItems = computed(
    () => store.getters["moralis/getAddresesToRewardTotalItems"]
  );

  const fetchNft = (object) => store.dispatch("moralis/fetchNft", object);
  const fetchAddresesToReward = (object) =>
    store.dispatch("moralis/fetchAddresesToReward", object);

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

  return {
    nftList,
    tableNftItems,
    fetchNft,
    fixUrl,
    nftListTotal,
    fetchAddresesToReward,
    addresesToReward,
    tableAddressesToRewardList,
    addresesToRewardTotalItems,
    giftCollectionName,
    giftCollectionSymbol,
  };
};

export default useMoralis;
