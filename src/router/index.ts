import { createMemoryHistory, createRouter, createWebHashHistory } from 'vue-router';

// import HomeView from './HomeView.vue';
import Login from '@/views/login/index.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login, // 这里应该是一个实际的组件路径
  },
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
