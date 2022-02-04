<template>
  <div class="home">
    <prepare-tokens-to-send-wrap />
    <collection-to-reward />
  </div>
</template>

<script>
import PrepareTokensToSendWrap from "@/components/PrepareTokensToSendTabs/PrepareTokensToSendWrap";
import CollectionToReward from "@/components/CollectionToReward";

export default {
  name: "DropolinoHome",
  components: {
    PrepareTokensToSendWrap,
    CollectionToReward,
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/dropolinoHome.scss"></style>
