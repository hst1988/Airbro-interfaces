<template>
  <div class="address-balance-wrapper">
    <div class="network">
      <img src="@/Common/Icons/matic2.png" alt="maticIcon" class="matic-icon" />
      <div>{{ capitalizeFirstLetter(networkName) }} Network</div>
    </div>
    <div class="address">
      <div class="avatar-wrap">
        <img
          src="@/Common/Icons/avatar.png"
          alt="avatarIcon"
          class="avatar-icon"
        />
        <div>{{ reduceAddress(6, 4) }}</div>
      </div>
      <div @click="disconnect">
        <img
          src="@/Common/Icons/disconnectIcon.png"
          alt="disconnectIcon"
          class="disconnect-icon"
        />
      </div>
    </div>
  </div>
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
        networkName?.value === "mainnet" ||
        networkName?.value === "ropsten"
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
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
      capitalizeFirstLetter,
    };
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/Common/Styles/userAddressAndbalance.scss"
></style>
