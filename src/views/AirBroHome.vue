<template>
  <div class="home">
    <air-bro />
    <prepare-tokens-to-send-wrap />
    <collection-to-reward />
    <air-drop-initiated />
  </div>
</template>

<script>
import PrepareTokensToSendWrap from "@/components/PrepareTokensToSendTabs/PrepareTokensToSendWrap";
import CollectionToReward from "@/components/CollectionToReward";
import AirDropInitiated from "@/components/AirDropInitiated";
import AirBro from "@/components/AirBro.vue";

export default {
  name: "AirBroHome",
  components: {
    PrepareTokensToSendWrap,
    CollectionToReward,
    AirDropInitiated,
    AirBro,
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/airBroHome.scss"></style>
