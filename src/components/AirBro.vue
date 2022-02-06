<template>
  <div class="air-bro-wrap">
    <p class="air-bro">Air bro</p>
    <p class="secondary-text">
      Easiest way to reward owners of the NFTs.Airdrop your new NFTs or tokens
      to them with just couple of clicks.
    </p>
    <app-button
      text="LET’S DROP IT"
      class="drop-it-button"
      v-scroll-to="'#prepareTokens'"
    />
  </div>
</template>
<script>
import AppButton from "@/elements/AppButton";
export default {
  components: {
    AppButton,
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/airBro.scss"></style>
