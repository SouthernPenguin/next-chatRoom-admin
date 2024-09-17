import { RolesTypes } from '../stores/user';
import { http } from '../utils/server';
import { ICreatedMenu } from '../views/base/menu/createdMenuType';

// 登录
export const login = (data: { name: string; password: string }) => {
  return http.post<{
    name: string;
    password: string;
    roles: RolesTypes[];
  }>('/auth/auth/login', data);
};

export type menuType = {
  id: number;
  parentId: number;
  name: string;
  menuCode: '';
  nodeType: number;
  url: string;
  assemblyName: string;
  assemblyUrl: string;
  sort: number;
  isDeleted: null;
  children?: menuType[];
};

// 获取目录
export const getMenu = (isTree: boolean | undefined = false) => http.get<menuType[]>('/menus?isTree=' + isTree);

// 获取第一级目录/菜单树
export const getFirstStage = () => http.get<menuType[]>('/menus/findFirstStage');

// 获取下机目录
export const nextMenu = (id: number) => http.get<menuType[]>(`/menus/${id}`);

// 创建目录/菜单/权限
export const createdMenu = (data: ICreatedMenu) => http.post<menuType>('/menus', data);

// 删除目录/菜单/权限
export const deleteMenu = (id: number) => http.delete(`/menus/${id}`);

// 更新
export const upDataMenu = (id: number, data: ICreatedMenu) => http.patch(`/menus/${id}`, data);

export default {
  login,
  getMenu,
  getFirstStage,
  nextMenu,
  createdMenu,
  deleteMenu,
  upDataMenu,
};
