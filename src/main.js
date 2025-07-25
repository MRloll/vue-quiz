import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import i18n from "./plugins/i18n";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.mount("#app");
