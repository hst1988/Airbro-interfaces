<template>
  <div class="send-new-token-wrapper">
    <div class="token-data">
      <app-input
        type="text"
        v-model="tokenName"
        labelText="What is the name of your new token?"
        name="TokenName"
        inputClass="form-box-input"
        labelClass="label"
        placeholder="Define name of your token"
      />
      <app-input
        type="text"
        v-model="tokenSymbol"
        labelText="What is the name of your new token?"
        name="TokenSymbol"
        inputClass="form-box-input"
        labelClass="label"
        placeholder="Up to 6 alphabetical characters"
      />
      <app-input
        type="text"
        v-model="tokenSupply"
        labelText="What is the total token supply"
        name="TokenSupply"
        inputClass="form-box-input"
        labelClass="label"
        placeholder="Amount of tokens you would like to mint"
      />
    </div>
    <div class="save-button-wrapper">
      <app-button text="Mint and continue" class="create-token-button" />
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import AppInput from "@/elements/AppInput";
export default {
  name: "SendNewToken",
  components: {
    AppButton,
    AppInput,
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/sendNewToken.scss"></style>
