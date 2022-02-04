<template>
  <button :class="buttonClass" :style="buttonStyle">
    <i v-if="iconClass" :class="iconClass" :style="iconStyle"></i>
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    text: String,
    buttonClass: {
      type: String,
      default: "",
    },
    buttonStyle: {
      type: Object,
      default: () => {},
    },
    iconClass: {
      type: String,
      default: "",
    },
    iconStyle: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
