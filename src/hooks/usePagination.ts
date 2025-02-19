// usePagination.ts
import { reactive, toRefs } from 'vue';

// 定义类型（支持泛型传递额外参数）
interface PaginationOptions<T extends Record<string, any> = {}> {
  page: number;
  limit: number;
  extraParams?: T; // 允许传入额外参数
}

export function usePagination<T extends Record<string, any>>(
  options: PaginationOptions<T> & { autoResetPage?: boolean }
) {
  // 合并默认分页参数 + 额外参数
  const state = reactive({
    page: options.page || 1,
    limit: options.limit || 10,
    total: 0,
    ...(options.extraParams || {}), // 展开额外参数
  });

  // 暴露响应式状态和方法
  return {
    ...toRefs(state), // 自动解构为 ref
    reset() {
      state.page = options.page || 1;
      state.limit = options.limit || 10;
      state.total = 0;
      // 重置额外参数（需类型断言）
      Object.assign(state, options.extraParams || {});
    },
  };
}
