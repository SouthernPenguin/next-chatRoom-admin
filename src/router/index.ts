import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Login from '@/views/login/index.vue';
import Home from '@/views/home/index.vue';
import Layout from '@/layout/index.vue';
import { getLocalStorageToken, menuTree } from '../utils';
import { getMenu } from '../api/auth';

import store from '@/stores/index';
import { UseLoginUser, useLoginUser } from '../stores/user';
const loginUser = useLoginUser(store);

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login, // 这里应该是一个实际的组件路径
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404/NotFound.vue'),
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

        menuTree(dynamicRoutes).forEach(item => {
          router.addRoute(item);
        });

        // router.addRoute(...menuTree(dynamicRoutes));
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
        });

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
