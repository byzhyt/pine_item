import { createApp } from "vue";
import App from "./App.vue";
import "uno.css";
import "./scss/index.scss";
import router from "./router";
import store from "./store";
import { createGlobalJson } from "./config/index";

const app: any = createApp(App);
createGlobalJson(app);
app.config.errorHandler = (err: any) => {
  console.table(err);
};


app.use(router);
app.use(store);

app.mount("#root-web");
