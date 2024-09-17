import { menuType } from '../api/auth';
// 使用 import.meta.glob 加载所有视图组件
const views = import.meta.glob('../views/**/*.vue', { eager: true });
const Layout = import.meta.glob('../layout/**/*.vue', { eager: true });

// 创建动态路由
function createDynamicRoutes(routesData: menuType[]) {
  const dynamicRoutes = routesData.map((route: menuType) => {
    if (route.nodeType === 1) {
      // 根据组件名称构建正确的路径
      const componentPath = `../views/${route.assemblyUrl}.vue`;
      // 获取组件
      const component = views[componentPath]['default'];

      // 如果组件未找到，则抛出错误
      if (!component) {
        throw new Error(`Component not found for path: ${componentPath}`);
      }

      return {
        path: route.url,
        ...route,
        component,
      };
    } else {
      // 根据组件名称构建正确的路径
      const componentPath = `../layout/index.vue`;
      // 获取组件
      const component = Layout[componentPath]['default'];

      // 如果组件未找到，则抛出错误
      if (!component) {
        throw new Error(`Component not found for path: ${componentPath}`);
      }

      return {
        component,
        ...route,
      };
    }
  });
  // 扩展路由
  return dynamicRoutes;
}

export default createDynamicRoutes;
