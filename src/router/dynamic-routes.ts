import router from './index';

// 使用 import.meta.glob 加载所有视图组件
const views = import.meta.glob('../views/**/*.vue', { eager: true });

// 创建动态路由
function createDynamicRoutes(routesData) {
  const dynamicRoutes = routesData.map(route => {
    // 根据组件名称构建正确的路径
    const componentPath = `../views/${route.componentUrl}.vue`;
    // 获取组件
    const component = views[componentPath]['default'];

    console.log(typeof component, 'component');
    // 如果组件未找到，则抛出错误
    if (!component) {
      throw new Error(`Component not found for path: ${componentPath}`);
    }

    return {
      ...route,
      component,
    };
  });
  // 扩展路由

  router.addRoute(...dynamicRoutes);
  return router;
}

export default createDynamicRoutes;
