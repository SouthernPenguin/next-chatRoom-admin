import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import './style.css';
import router from './router';
import App from './App.vue';
async function bootstrap() {
  try {
    // 使用动态路由函数创建动态路由
    const dynamicRouter = await import('./router/dynamic-routes');

    const routesData = [
      {
        path: '/login',
        name: 'login',
        componentUrl: 'login/index', // 这里应该是一个实际的组件路径
      },
    ];
    dynamicRouter.default(routesData);

    const app = createApp(App);
    console.log(router);
    app.use(router).use(ElementPlus).use(createPinia()).mount('#app');

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
