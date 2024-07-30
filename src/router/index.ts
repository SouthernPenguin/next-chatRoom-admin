import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router';

// import HomeView from './HomeView.vue';
import AboutView from '../pages/HomeView.vue';

const routes = [
  // { path: '/', component: HomeView },
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
