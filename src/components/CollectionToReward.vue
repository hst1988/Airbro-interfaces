<template>
  <div class="collection-reward-wrap" id="reward">
    <div class="head-text">
      <p class="headline-primary-text">Who gets the drop?</p>
    </div>
    <div class="address-to-reward-wrap">
      <p class="headline-secondary-text">
        Select one or more NFT collections whose owners you would like to reward
        with the airdrop. You can search for collections by name or by pasting
        NFT collection address.
      </p>
      <div class="input-wrap">
        <app-input
          type="text"
          v-model="rewardAddress"
          labelText="Collection to reward"
          name="CollectionToReward"
          inputClass="form-box-input"
          labelClass="label"
          placeholder="Search for collection name or paste collection address"
        />
      </div>
      <div>
        <app-button
          text="Add to the list"
          class="add-to-list-button"
          @click="addAddressToReward"
          :disabled="rewardAddress ? false : true"
        />
      </div>
      <div class="list-of-drop-items">
        <div>
          <p class="text">Eligible collections</p>
          <list-table
            :items="tableAddressesToRewardList"
            :fields="tableFields"
          />
        </div>
        <div
          class="info"
          v-if="
            nftListTotal < addresesToRewardTotalItems[0] &&
            tokenToSendComponent === 'SendNft'
          "
        >
          <img
            src="@/Common/Icons/toolTipIcon.png"
            alt="info-icon"
            class="info-icon"
          />
          <p class="info-text">
            Number of airdrop items is significantly lower than number of
            potential receivers. Items will be assigned with the "first come,
            first served" logic.
          </p>
        </div>
        <div class="info-box">
          <span v-if="tableListLength && tokenToSendComponent === 'SendNft'">
            Drop {{ nftListTotal }} items to
            {{ addresesToRewardTotalItems[0] }}
            addresses</span
          >
          <span
            v-if="tableListLength && tokenToSendComponent === 'SendNewToken'"
          >
            Drop {{ newTokenSupply }} {{ newTokenSymbol }} to
            {{ addresesToRewardTotalItems[0] }}
            addresses ({{ tokensPerAddress }} {{ newTokenSymbol }} per
            address)</span
          >
        </div>
        <div>
          <app-button
            text="Approve"
            class="approve-drop-button"
            :disabled="!tableListLength"
            v-scroll-to="'#finishIt'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import AppInput from "@/elements/AppInput";
import ListTable from "@/components/ListTable.vue";
import { useStore } from "vuex";
import useMoralis from "@/composables/useMoralis";
import useContracts from "@/composables/useContracts";
import useTransactions from "@/composables/useTransactions";
import useSendNewToken from "@/composables/useSendNewToken";
import { computed, ref } from "vue";

export default {
  components: {
    AppButton,
    AppInput,
    ListTable,
  },
  setup() {
    const store = useStore();
    const {
      fetchAddresesToReward,
      tableAddressesToRewardList,
      nftListTotal,
      addresesToRewardTotalItems,
    } = useMoralis(store);

    const { networkName } = useContracts(store);

    const { tokenToSendComponent } = useTransactions(store);

    const { newTokenSymbol, newTokenSupply } = useSendNewToken(store);

    const rewardAddress = ref("");
    const tableFields = ref([
      { key: "Collection_Name", label: "Collection name (no of addresses)" },
      { key: "Collection_Address", label: "Collection address" },
    ]);

    const tableListLength = computed(
      () => tableAddressesToRewardList.value.length > 0
    );

    const addAddressToReward = () => {
      const options = {
        chain: networkName?.value,
        address: rewardAddress.value,
      };
      fetchAddresesToReward(options);
      rewardAddress.value = "";
    };

    const tokensPerAddress = computed(() => {
      let tokens = parseFloat(
        newTokenSupply.value / addresesToRewardTotalItems.value[0]
      ).toFixed(4);
      return tokens;
    });

    return {
      addAddressToReward,
      rewardAddress,
      tableFields,
      tableListLength,
      nftListTotal,
      tableAddressesToRewardList,
      addresesToRewardTotalItems,
      newTokenSymbol,
      newTokenSupply,
      tokenToSendComponent,
      tokensPerAddress,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/collectionToReward.scss"></style>
