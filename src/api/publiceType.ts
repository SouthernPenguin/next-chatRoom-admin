/**
 * 公共类型
 */

// 页码搜索
export interface SearchPageInterface {
  page: number;
  limit: number;
}

// 列表分页分页

export interface ReturnListInterface<T> {
  content: T;
  totalElements: number;
  totalPages: number;
}
