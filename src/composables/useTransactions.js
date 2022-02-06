import { computed } from "vue";

const useTransactions = (store) => {
  const isTarnsationSuccess = computed(
    () => store.getters["transactions/getIsTarnsationSuccess"]
  );
  const isTransactionFinished = computed(
    () => store.getters["transactions/getIsTransactionFinished"]
  );
  const txHash = computed(() => store.getters["transactions/getTxHash"]);

  const rewardNftToNftHolders = (
    rewardedNftCollection,
    newNftCollectionName,
    newNftCollectionSymbol,
    newNftSupply,
    baseUri
  ) => {
    store.dispatch("transactions/rewardNftToNftHolders", {
      rewardedNftCollection,
      newNftCollectionName,
      newNftCollectionSymbol,
      newNftSupply,
      baseUri,
    });

    store.dispatch("moralis/resetState");
  };

  return {
    rewardNftToNftHolders,
    isTarnsationSuccess,
    isTransactionFinished,
    txHash,
  };
};
export default useTransactions;
