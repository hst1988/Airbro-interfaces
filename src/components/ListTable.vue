<template>
  <div>
    <b-table striped hover :items="items" dark></b-table>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const items = ref([
      { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
      { age: 21, first_name: "Larsen", last_name: "Shaw" },
      { age: 89, first_name: "Geneva", last_name: "Wilson" },
      { age: 38, first_name: "Jami", last_name: "Carney" },
    ]);
    return {
      items,
    };
  },
};
</script>
<style lang="scss" scoped src="@/Common/Styles/listTable.scss"></style>
