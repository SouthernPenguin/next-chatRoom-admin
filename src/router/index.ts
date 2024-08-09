import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router';

// import HomeView from './HomeView.vue';
import AboutView from '@/views/HomeView.vue';

const routes = [
  // { path: '/login', component: views[`@/views/${s}.vue`] },
  { path: '/about', component: AboutView },
];

const router = createRouter({
  //  history:
  //   process.env.NODE_ENV === 'production'
  //     ? createWebHistory()
  //     : createWebHashHistory()

  history: createWebHashHistory(),
  routes,
});
export default router;
