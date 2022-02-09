<template>
  <div class="menu-bar">
    <div class="logo-wrap">
      <img
        src="@/Common/Icons/WebNavBarLogo.svg"
        alt="AirBroLogo"
        class="airbro-logo"
      />
      <div class="powerd">Powered by NFTizer</div>
    </div>
    <div class="connect-wrapper">
      <app-button
        v-if="!address"
        buttonClass="connect-metamask"
        text="Connect wallet"
        @click="loginOrSignUp()"
      />
      <user-address-and-balance v-else />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { ethereumService } from "@/main";
import useContracts from "@/composables/useContracts";
import AppButton from "@/elements/AppButton";
import UserAddressAndBalance from "@/components/UserAddressAndBalance";

export default {
  name: "MenuBar",
  components: {
    AppButton,
    UserAddressAndBalance,
  },
  setup() {
    const store = useStore();
    const { loginOrSignUp } = useContracts(store, ethereumService);
    const address = computed(() => store.getters["contracts/getAddress"]);

    return {
      loginOrSignUp,
      address,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/menuBar.scss"></style>
