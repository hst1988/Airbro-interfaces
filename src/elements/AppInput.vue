<template>
  <div class="app-input">
    <label :for="id" :class="labelClass">{{ labelText }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="id"
      :placeholder="placeholder"
      :class="inputClass"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    labelText: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    inputClass: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
  },
};
</script>
