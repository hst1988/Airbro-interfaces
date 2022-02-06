import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue3 from "bootstrap-vue-3";
import EthereumService from "./services/ethereum";
import Moralis from "./plugins/moralis";

const VueScrollTo = require("vue-scrollto");

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@/Common/Styles/base.scss";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(BootstrapVue3)
  .use(VueScrollTo)
  .provide("$moralis", Moralis);

const CHAIN_ID = 1;
export const ethereumService = new EthereumService(CHAIN_ID);

app.provide("ethereumService", ethereumService);
app.mount("#app");
