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
      <app-button
        text="Add to the drop"
        class="add-to-drop-button"
        @click="getNftList"
        :disabled="collectionAddress ? false : true"
      />
    </div>
    <div class="list-of-drop-items">
      <p class="total-list-num">
        List for airdrop items {{ nftListTotal || 0 }}
      </p>
      <list-table :items="tableNftItems" :fields="tableFields" />
      <div>
        <app-button
          text="Looks good, next step"
          class="add-to-drop-button"
          :disabled="nftList.length === 0"
          v-scroll-to="'#reward'"
        />
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
import { ref, watch } from "vue";

export default {
  name: "SendNft",
  components: {
    AppButton,
    AppInput,
    ListTable,
  },
  setup() {
    const store = useStore();
    const { fetchNft, nftList, tableNftItems, nftListTotal } =
      useMoralis(store);
    const { address, networkName } = useContracts(store);
    const tableFields = ref([
      { key: "Item_name", label: "Item Name" },
      { key: "Collection_name", label: "Collection name" },
      { key: "NFT_ID", label: "NFT ID" },
    ]);
    const collectionAddress = ref("");
    const spinner = ref(false);
    const getNftList = async () => {
      const options = {
        chain: networkName?.value,
        address: collectionAddress.value || address.value,
      };
      fetchNft(options);
      collectionAddress.value = "";
    };
    watch(nftList, (newValue) => {
      newValue.length > 0 ? (spinner.value = false) : (spinner.value = true);
    });
    return {
      getNftList,
      tableNftItems,
      collectionAddress,
      nftList,
      tableFields,
      nftListTotal,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/sendNft.scss"></style>
