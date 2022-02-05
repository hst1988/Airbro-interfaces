import { createStore } from "vuex";
import contracts from "./modules/contracts";
import moralis from "./modules/moralis";

export default createStore({
  modules: {
    contracts,
    moralis,
  },
});
