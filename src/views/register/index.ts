import { createApp } from "vue";
import type { Environment } from "@/types/environment";

import index from "./index.vue";


const app = createApp(index);


const environment = document.querySelector("#environment") as HTMLElement;
app.provide<Environment>("environment", JSON.parse(String(environment.textContent)));


app.mount("#app");
