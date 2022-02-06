import { createStore } from "vuex";
import contracts from "./modules/contracts";
import moralis from "./modules/moralis";
import transactions from "./modules/transactions";

export default createStore({
  modules: {
    contracts,
    moralis,
    transactions,
  },
});
