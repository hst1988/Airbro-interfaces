import { computed } from "vue";

const useSendNewToken = (store) => {
  const newTokenName = computed(() =>
    store.getters["sendNewToken/getByKey"]("newTokenName")
  );
  const newTokenSymbol = computed(() =>
    store.getters["sendNewToken/getByKey"]("newTokenSymbol")
  );
  const newTokenSupply = computed(() =>
    store.getters["sendNewToken/getByKey"]("newTokenSupply")
  );
  const tokenToSendComponent = computed(() =>
    store.getters["sendNewToken/getByKey"]("tokenToSendComponent")
  );
  return {
    newTokenName,
    newTokenSymbol,
    newTokenSupply,
    tokenToSendComponent,
  };
};

export default useSendNewToken;
