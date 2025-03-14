/**
 * 公共类型
 */

// 页码搜索
export interface ISearchPageInterface {
  page: number;
  limit: number;
  blurry?: string;
}

// 网络请求列表分页接口 API层
export interface IReturnList<T = any> {
  content: T;
  totalElements: number;
  totalPages: number;
}

// 页面网络请求返回接口 UI层
export interface ReturnPageList<T = any, F = any> extends ISearchPageInterface {
  total: number;
  tableData: T; // 表格数据类型
  formSearch: F; // 表单数据类型
}
