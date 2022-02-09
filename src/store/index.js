import { createStore } from "vuex";
import contracts from "./modules/contracts";
import moralis from "./modules/moralis";
import transactions from "./modules/transactions";
import sendNewToken from "./modules/sendNewToken";

export default createStore({
  modules: {
    contracts,
    moralis,
    transactions,
    sendNewToken,
  },
});
