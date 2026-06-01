import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import "./assets/styles/reset.css";
import "./assets/styles/global.css";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.js";

// Vant 组件按需引入（推荐）
import Vant from "vant";
import "vant/lib/index.css";

import router from "./router";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Vant);
app.mount("#app");
