<template>
  <div class="send-new-token-wrapper">
    <div class="token-data">
      <app-input
        type="text"
        v-model="newTokenName"
        labelText="What is the name of your new token?"
        name="TokenName"
        inputClass="form-box-input"
        labelClass="label"
        placeholder="Define name of your token"
      />
      <app-input
        type="text"
        v-model="newTokenSymbol"
        labelText="What is the token symbol?"
        name="TokenSymbol"
        inputClass="form-box-input"
        labelClass="label"
        placeholder="Up to 6 alphabetical characters"
      />
      <app-input
        type="text"
        v-model="newTokenSupply"
        labelText="What is the total token supply"
        name="TokenSupply"
        inputClass="form-box-input"
        labelClass="label"
        placeholder="Amount of tokens you would like to mint"
      />
    </div>
    <div class="save-button-wrapper">
      <app-button
        text="Mint and continue"
        class="create-token-button"
        v-scroll-to="'#reward'"
        :disabled="isButtonDisabled"
        @click="setStoreTokenValues()"
      />
    </div>
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
import AppInput from "@/elements/AppInput";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

export default {
  name: "SendNewToken",
  components: {
    AppButton,
    AppInput,
  },
  setup() {
    const store = useStore();
    const newTokenName = ref("");
    const newTokenSymbol = ref("");
    const newTokenSupply = ref("");

    const setStoreTokenValues = () => {
      store.dispatch("sendNewToken/commitByKey", {
        newTokenName: newTokenName.value,
      });
      store.dispatch("sendNewToken/commitByKey", {
        newTokenSymbol: newTokenSymbol.value,
      });
      store.dispatch("sendNewToken/commitByKey", {
        newTokenSupply: newTokenSupply.value,
      });
    };
    const isButtonDisabled = computed(() =>
      !newTokenName.value || !newTokenSymbol.value || !newTokenSupply.value
        ? true
        : false
    );
    onMounted(() => {
      store.dispatch("sendNewToken/resetState");
    });
    return {
      newTokenName,
      newTokenSupply,
      newTokenSymbol,
      setStoreTokenValues,
      isButtonDisabled,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/sendNewToken.scss"></style>
