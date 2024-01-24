import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./plugins/charts";
import { loadFonts } from "./plugins/webfontloader";
import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "vuetify/dist/vuetify.min.css";

loadFonts();

const app = createApp(App);
app.use(Toast);
app.use(router);
app.use(vuetify);
app.mount("#app");
