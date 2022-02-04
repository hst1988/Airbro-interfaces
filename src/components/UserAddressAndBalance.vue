<template>
  <div class="address-balance-wrapper">
    <div class="network">{{ networkName }}</div>
    <div class="balance">
      {{ parseFloat(balance.default).toFixed(5) }} | {{ currencyValue() }}
    </div>
    <div class="address">{{ reduceAddress(6, 4) }}</div>
  </div>
  <p class="disconect" @click="disconnect">Dissconect your wallet</p>
</template>

<script>
import { useStore } from "vuex";
import { ethereumService } from "@/main";
import useContracts from "@/composables/useContracts";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const currency = ref("");
    const { address, balance, network, networkName } = useContracts(
      store,
      ethereumService
    );
    const reduceAddress = (lengthLeft, lengthRight) => {
      if (address.value) {
        const addressLeftPart = address.value.substring(0, lengthLeft);
        const addressRightPart = address.value.substring(42 - lengthRight, 42);
        return `${addressLeftPart}...${addressRightPart}`;
      }
      return "Not connected";
    };
    const currencyValue = () => {
      if (
        networkName?.value === "Mainnet" ||
        networkName?.value === "Ropsten"
      ) {
        return (currency.value = "ETH");
      } else {
        return (currency.value = "Matic");
      }
    };

    const disconnect = async () => {
      await store.dispatch("contracts/resetState");
      await ethereumService.disconnectProvider();
      await router.push("/");
    };

    onMounted(async () => {
      await store.dispatch("contracts/fetchAddress");
      await store.dispatch("contracts/fetchBalance", address.value);
    });
    return {
      reduceAddress,
      address,
      balance,
      network,
      networkName,
      currencyValue,
      disconnect,
    };
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/Common/Styles/userAddressAndbalance.scss"
></style>
