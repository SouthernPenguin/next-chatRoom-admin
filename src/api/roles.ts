import qs from 'qs';
import { http } from '../utils/server';
import { IReturnList, ISearchPageInterface } from '../types/publiceType.ts';
import { menuType } from './auth';

interface IRolesList extends ISearchPageInterface {
  name: string;
}

export interface RoleRowInterface {
  name: string;
  id: number;
  value?: number;
  label?: string;
}

interface RolesDetailInterface extends RoleRowInterface {
  menus: menuType[];
}

/**
 * 列表
 * @param params IReturnList
 * @returns
 */
export const getRoles = (params: IRolesList) =>
  http.get<IReturnList<RoleRowInterface[]>>('/roles?' + qs.stringify(params));

/**
 * 详情
 * @param id
 * @returns
 */
export const rolesDetail = (id: number) => http.get<RolesDetailInterface>(`/roles/${id}`);

/**
 * 更新
 * @param id
 * @param menuIds 菜单id
 * @returns
 */
export const rolesUpdate = (id: number, menuIds: number[]) => http.patch(`/roles/${id}`, { menuIds });

/**
 * 更新
 * @param id
 * @param menuIds 菜单id
 * @returns
 */
export const rolesCreate = (data: { name: string; menuIds: number[] }) => http.post(`/roles`, data);
