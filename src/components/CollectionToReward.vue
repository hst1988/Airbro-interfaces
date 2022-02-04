<template>
  <div class="collection-reward-wrap">
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
        <app-button text="Add to the list" class="add-to-list-button" />
      </div>
      <div class="list-of-drop-items">
        <p>Eligible collections</p>
        <list-table />
        <div class="info">
          <img
            src="@/Common/Icons/toolTipIcon.png"
            alt="info-icon"
            class="info-icon"
          />
          <p class="info-text">
            Number of airdrop items is significantly lower than number of
            potential receivers. Items will be assigned based on order in smart
            contract / random order.
          </p>
        </div>
        <div class="info-box">Drop 34 items to 5670 addresses</div>
        <div>
          <app-button text="Approve and drop it!" class="approve-drop-button" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import AppInput from "@/elements/AppInput";
import ListTable from "@/components/ListTable.vue";

export default {
  components: {
    AppButton,
    AppInput,
    ListTable,
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/collectionToReward.scss"></style>
