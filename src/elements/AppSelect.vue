<template>
  <div>
    <label for="" :class="labelClass">{{ labelText }}</label>
    <select
      :value="modelValue"
      @change="(event) => $emit('update:modelValue', event.target.value)"
      :class="selectClass"
    >
      <option value="" disabled selected>Select the token to distribute</option>
      <option
        v-for="(option, index) in options"
        :value="option"
        :key="index"
        :id="id"
      >
        {{ index }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
    },
    id: {
      type: String,
    },
    labelText: {
      type: String,
    },
    selectClass: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
};
</script>
