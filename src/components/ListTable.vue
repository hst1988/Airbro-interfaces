<template>
  <div class="table">
    <b-table
      striped
      sticky-header
      hover
      :items="items"
      :fields="fields"
      dark
      foot-clone
    ></b-table>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/listTable.scss"></style>
