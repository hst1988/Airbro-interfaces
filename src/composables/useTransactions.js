import { computed } from "vue";

const useTransactions = (store) => {
  const isTarnsationSuccess = computed(
    () => store.getters["transactions/getIsTarnsationSuccess"]
  );
  const isTransactionFinished = computed(
    () => store.getters["transactions/getIsTransactionFinished"]
  );

  const tokenToSendComponent = computed(() =>
    store.getters["transactions/getByKey"]("tokenToSendComponent")
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

  const dropNewTokensToNftHolders = (
    rewardedNftCollection,
    newTokenName,
    newTokenSymbol,
    newTokenSypply
  ) => {
    store.dispatch("transactions/dropNewTokensToNftHolders", {
      rewardedNftCollection,
      newTokenName,
      newTokenSymbol,
      newTokenSypply,
    });

    store.dispatch("moralis/resetState");
    store.dispatch("sendNewToken/resetState");
  };

  return {
    rewardNftToNftHolders,
    dropNewTokensToNftHolders,
    isTarnsationSuccess,
    isTransactionFinished,
    txHash,
    tokenToSendComponent,
  };
};
export default useTransactions;
