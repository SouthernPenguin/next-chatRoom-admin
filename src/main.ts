import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './style.css';
import App from './App.vue';
createApp(App).use(ElementPlus).use(createPinia()).mount('#app');
const a = 'ss';
