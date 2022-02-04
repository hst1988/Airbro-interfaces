import { useRouter } from "vue-router";
import { computed } from "vue";

const useContracts = (store, ethereumService, router = useRouter()) => {
  const disconnect = async () => {
    await store.dispatch("contracts/resetState");
    return await router.push("/");
  };
  const handleAccountChange = async (account) => {
    console.log(
      `Account changed: ${account}`,
      `Please, sign the transaction on Metamask to continue.`,
      "Success"
    );
    await disconnect();
    await loginOrSignUp(true);
  };
  const handleChainChange = async (chain) => {
    chain === "Selected network is not supported."
      ? console.log("Network not supported", chain, "Error")
      : console.log("Network changed", chain, "Success");
    let publicAddress = await store.dispatch("contracts/fetchAddress");
    await store.dispatch("contracts/fetchNetwork");
    await store.dispatch("contracts/fetchNetworkName");
    await store.dispatch("contracts/fetchBalance", publicAddress);
  };
  const loginOrSignUp = async (isAccountChange = false) => {
    await ethereumService.connectToProvider();
    if (!isAccountChange) {
      await ethereumService.onAccountChanged(handleAccountChange);
    }
    await ethereumService.onChainChanged(handleChainChange);
    await store.dispatch("contracts/fetchNetwork");
    await store.dispatch("contracts/fetchNetworkName");
    let publicAddress = await store.dispatch("contracts/fetchAddress");
    await store.dispatch("contracts/fetchBalance", publicAddress);
    let nonce = publicAddress;
    const signature = await store.dispatch("contracts/signNonce", nonce);
    if (signature === "rejected") {
      console.log(
        "MetaMask error",
        "Please, sign the message to access the advanced features of the application.",
        "Error"
      );
      return disconnect();
    }
  };

  const address = computed(() => store.getters["contracts/getAddress"]);
  const balance = computed(() => store.getters["contracts/getBalance"]);
  const network = computed(() => store.getters["contracts/getNetwork"]);
  const networkName = computed(() => store.getters["contracts/getNetworkName"]);
  return {
    loginOrSignUp,
    handleChainChange,
    handleAccountChange,
    address,
    balance,
    network,
    networkName,
  };
};

export default useContracts;
