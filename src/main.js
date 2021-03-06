import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./js/store";
import JsonViewer from "vue-json-viewer";

// firebase analytics
import { initFb } from "./js/fb";
initFb();

Vue.use(JsonViewer);

import TabVisibility from "@/js/classes/tabvisibility";
const tabVisibility = new TabVisibility();

Vue.config.productionTip = false;

// get initial git data from cache
store.dispatch("vizzyInit");

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");

// when tab comes in view, its possible a new render is needed
tabVisibility
  .onVisible(() => store.dispatch("updateRoot", true))
  .onHidden(() => store.commit("setInfoMoused", false));
