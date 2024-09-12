import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '@/views/login/index.vue';
import Layout from '@/layout/index.vue';
import { getLocalStorageToken, menuTree } from '../utils';
import { getMenu } from '../api/auth';

import store from '@/stores/index';
import { UseLoginUser, useLoginUser } from '../stores/user';
const loginUser = useLoginUser(store);

export const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
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

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  // 检查用户是否已登录
  if (getLocalStorageToken()) {
    if (to.name === 'login') {
      next({ path: '/' });
    } else if (!loginUser.isLoadingMenu) {
      const dynamicRouter = await import('./dynamic-routes');
      const res = await getMenu();
      const routesData = res.data;
      if (routesData.length) {
        const dynamicRoutes = dynamicRouter.default(routesData);
        router.addRoute(...menuTree(dynamicRoutes));
        loginUser.$patch((state: UseLoginUser) => {
          state.isLoadingMenu = true;
        });
      }
      next({ ...to, replace: true });
    } else {
      loginUser.isLoadingMenu = true;
      next();
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
});

export default router;
