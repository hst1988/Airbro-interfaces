import { createStore } from "vuex";
import contracts from "./modules/contracts";

export default createStore({
  modules: {
    contracts,
  },
});
