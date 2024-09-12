import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import './style.css';
import router from './router';
import App from './App.vue';
async function bootstrap() {
  try {
    const app = createApp(App);

    // pinia持久化
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);

    app.use(router).use(ElementPlus).use(pinia).mount('#app');

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
