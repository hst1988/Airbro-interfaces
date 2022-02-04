<template>
  <div class="send-nfts-wrapper">
    <div class="import-csv-wrap">
      <div class="input-wrap">
        <app-input
          type="text"
          v-model="collectionAddress"
          labelText="Import your NFT collection"
          name="NFTColectionAddress"
          inputClass="form-box-input"
          labelClass="label"
          placeholder="Paste your NFT collection address or import CSV file"
        />
      </div>
      <div class="import-csv-button-wrap">
        <app-button text="Import CSV" class="import-csv-button" />
      </div>
    </div>
    <div>
      <app-button text="Add to the drop" class="add-to-drop-button" />
    </div>
    <div class="list-of-drop-items">
      <p>List for airdrop items (34)</p>
      <list-table />
      <div>
        <app-button text="Looks good, next step" class="add-to-drop-button" />
      </div>
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import AppInput from "@/elements/AppInput";
import ListTable from "@/components/ListTable.vue";

export default {
  name: "SendNft",
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
<style lang="scss" scoped src="@/Common/Styles/sendNft.scss"></style>
