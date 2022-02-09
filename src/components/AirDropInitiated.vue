<template>
  <div class="air-drop-init-wrap" id="finishIt">
    <div class="head-text">
      <p class="headline-primary-text">Initiate airdrop...</p>
    </div>
    <div class="reward-user-wrap">
      <div>
        <p class="headline-secondary-text">
          Airdrop has started, it might take a while...
        </p>
      </div>
      <div class="spinner">
        <p class="sum-text">Summary</p>
        <b-spinner
          variant="light"
          v-if="!isTransactionFinished && !txHash"
        ></b-spinner>
      </div>
      <div class="done-message" v-if="txHash">
        <p>Transaction Finished</p>
      </div>
      <div>
        <app-button
          v-if="tokenToSendComponent === 'SendNft'"
          id="SendNft"
          text="Complete the drop"
          class="complete-drop-button"
          :disabled="tableAddressesToRewardList.length === 0"
          @click="
            rewardNftToNftHolders(
              rewardedNftCollection,
              giftNftCollectionName,
              giftNftCollectionSymbol,
              giftNftSupply,
              baseUri
            )
          "
        />
        <app-button
          v-if="tokenToSendComponent === 'SendNewToken'"
          id="SendNewToken"
          text="Complete the drop"
          class="complete-drop-button"
          :disabled="tableAddressesToRewardList.length === 0"
          @click="
            dropNewTokensToNftHolders(
              rewardedNftCollection,
              newTokenName,
              newTokenSymbol,
              newTokenSupply
            )
          "
        />
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import { useStore } from "vuex";
import useTransactions from "@/composables/useTransactions";
import useSendNewToken from "@/composables/useSendNewToken";
import useMoralis from "@/composables/useMoralis";
import useContracts from "@/composables/useContracts";
import { ref, computed } from "vue";

export default {
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();
    const {
      rewardNftToNftHolders,
      dropNewTokensToNftHolders,
      txHash,
      isTransactionFinished,
      tokenToSendComponent,
    } = useTransactions(store);

    const { newTokenName, newTokenSymbol, newTokenSupply } =
      useSendNewToken(store);

    const {
      addresesToReward,
      nftListTotal,
      giftCollectionSymbol,
      giftCollectionName,
      tableAddressesToRewardList,
    } = useMoralis(store);

    const { networkName } = useContracts(store);

    const baseUri = ref("https://ipfs.moralis.io:2053/ipfs/");
    const rewardedNftCollection = computed(() => addresesToReward.value[0]);
    const giftNftCollectionName = computed(() => giftCollectionName.value);
    const giftNftCollectionSymbol = computed(() => giftCollectionSymbol.value);
    const giftNftSupply = computed(() => nftListTotal.value);

    return {
      rewardNftToNftHolders,
      baseUri,
      addresesToReward,
      networkName,
      nftListTotal,
      rewardedNftCollection,
      giftNftCollectionName,
      giftNftCollectionSymbol,
      giftNftSupply,
      txHash,
      isTransactionFinished,
      tableAddressesToRewardList,
      tokenToSendComponent,
      newTokenName,
      newTokenSymbol,
      newTokenSupply,
      dropNewTokensToNftHolders,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/airDropInitiated.scss"></style>
