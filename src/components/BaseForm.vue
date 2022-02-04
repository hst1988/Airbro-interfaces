<template>
  <Form :method="method" @submit="onSubmit">
    <p v-if="title">{{ title }}</p>
    <slot></slot>
  </Form>
</template>

<script>
import { Form } from "vee-validate";

export default {
  name: "BaseForm",
  components: {
    Form,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    method: {
      type: String,
      default: "post",
    },
    handleSubmit: {
      type: Function,
    },
  },
  setup(props) {
    function onSubmit() {
      return props.handleSubmit();
    }
    return {
      onSubmit,
    };
  },
};
</script>
