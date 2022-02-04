<template>
  <div class="prepare-tokens-wrap">
    <div class="head-text">
      <p class="headline-primary-text">What is the airdrop?</p>
    </div>
    <div class="button-component-wrap">
      <p class="headline-secondary-text">
        Here you can select the type and content for the airdrop. You can drop
        NFTs, some of the existing ERC-20 tokens or mint your own token for the
        specific usage
      </p>
      <div class="tab-buttons-wrap">
        <app-button
          text="My NFT collection"
          class="tab-button"
          @click="changeComponent('SendNft')"
        />
        <app-button
          text="Existing tokens"
          class="tab-button"
          @click="changeComponent('SendExistingToken')"
        />
        <app-button
          text="New token"
          class="tab-button"
          @click="changeComponent('SendNewToken')"
        />
      </div>
      <component :is="componentName" />
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton.vue";
import SendNft from "@/components/PrepareTokensToSendTabs/SendNft";
import SendExistingToken from "@/components/PrepareTokensToSendTabs/SendExistingToken";
import SendNewToken from "@/components/PrepareTokensToSendTabs/SendNewToken.vue";
import { ref } from "vue";

export default {
  components: {
    AppButton,
    SendNft,
    SendExistingToken,
    SendNewToken,
  },
  setup() {
    const componentName = ref("SendNft");

    const changeComponent = (name) => {
      componentName.value = name;
    };
    return {
      componentName,
      changeComponent,
    };
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/Common/Styles/prepareTokensToSendWrap.scss"
></style>
