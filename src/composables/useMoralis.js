import { computed } from "vue";

const useMoralis = (store) => {
  const nftList = computed(() => store.getters["moralis/getNftList"]);
  const tableItems = computed(() => store.getters["moralis/getTableItems"]);
  const nftListTotal = computed(() => store.getters["moralis/getNftListTotal"]);

  const fetchNft = (object) => store.dispatch("moralis/fetchNft", object);

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
    tableItems,
    fetchNft,
    fixUrl,
    nftListTotal,
  };
};

export default useMoralis;
