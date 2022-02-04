<template>
  <div class="send-existing-token-wrapper">
    <app-select
      type="text"
      v-model="tokenAddress"
      labelClass="label"
      labelText="Which token you want to distribute?"
      selectClass="form-box-select"
      :options="fruitOptions"
    />
    <div class="current-network-wrap">
      <div class="label-text">On which network</div>
      <div class="current-network"></div>
    </div>
    <app-input
      type="text"
      v-model="tokenAmouunt"
      labelText="Amount to distribute"
      name="AmountToDistribute"
      inputClass="form-box-input"
      labelClass="label"
      placeholder="Token amount to airdrop"
    />
    <div class="add-button-wrapper">
      <app-button text="Looks good, next step" class="next-step-button" />
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import AppSelect from "@/elements/AppSelect";
import AppInput from "@/elements/AppInput";
import { ref } from "vue";
export default {
  name: "SendExistingToken",
  components: {
    AppButton,
    AppSelect,
    AppInput,
  },
  setup() {
    const tokenAddress = ref("");
    return {
      tokenAddress,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/sendExistingToken.scss"></style>
