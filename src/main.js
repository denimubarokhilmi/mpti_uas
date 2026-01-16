import { createApp } from "vue";
import { createPinia } from "pinia";
import navbar from "./layouts/navbar.vue";
import router from "./router/router.js";
import calendars from "./layouts/calendars.vue";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();
export const path_image = import.meta.env.VITE_PATH_IMAGE;
export const APIURL = import.meta.env.VITE_API_URL;
app.component("navbar", navbar);
app.component("calendars", calendars);
app.use(pinia);
app.use(router);
app.mount("#app");
