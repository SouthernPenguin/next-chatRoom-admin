import { __TOKEN__ } from './constant';

/**
 * 模块名: 设置token
 * @param string token
 */
export const setLocalStorageToken = (token: string) => localStorage.setItem(__TOKEN__, token);

/**
 * 模块名:获取token
 */
export const getLocalStorageToken = () => localStorage.getItem(__TOKEN__);

/**
 * 模块名: 移除token
 */
export const moveLocalStorageToken = () => localStorage.removeItem(__TOKEN__);

/**
 * 模块名:移除所有缓存
 */
export const allLocalStorageMove = () => localStorage.clear();

/**
 * 生成树状图
 * @param array list 数组
 * @param number parentId 分类id
 * @returns Array
 */
export const menuTree = (list: any[], parentId: number = 0): any[] | string => {
  if (list.length < 0) return '请传入数组';
  const returnList: any[] = [];
  list.forEach(item => {
    if (item.parentId === parentId && (item.isDeleted === 0 || !item.isDeleted)) {
      item.children = menuTree(list, item.id);
      returnList.push(item);
    }
  });
  return returnList;
};
