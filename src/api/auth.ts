import { RolesTypes } from '../stores/user';
import { http } from '../utils/server';

// 登录
export const login = (data: { name: string; password: string }) => {
  return http.post<{
    name: string;
    password: string;
    roles: RolesTypes[];
  }>('/auth/auth/login', data);
};

export type TMenuType = {
  id: number;
  parentId: number;
  name: string;
  menuCode: '';
  nodeType: number;
  url: string;
  assemblyName: null;
  assemblyUrl: null;
  sort: null;
  isDeleted: null;
};
// 获取目录
export const getMenu = () => http.get<TMenuType[]>('/menus');
