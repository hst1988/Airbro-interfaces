<template>
  <menu-bar />
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { ethereumService } from "./main";
import useContracts from "@/composables/useContracts";
import MenuBar from "@/components/MenuBar";

export default {
  components: {
    MenuBar,
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      const { handleAccountChange, handleChainChange } = useContracts(
        store,
        ethereumService
      );
      await store.dispatch("contracts/fetchNetworkName");
      await ethereumService.onAccountChanged(handleAccountChange);
      await ethereumService.onChainChanged(handleChainChange);
    });
  },
};
</script>
