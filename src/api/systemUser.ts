import qs from 'qs';
import { http } from '../utils/server';
import { ReturnListInterface, SearchPageInterface } from '../types/publiceType.ts';
import { RoleRowInterface } from './roles';

interface systemUserList extends SearchPageInterface {
  name?: string;
}

export interface SystemUserRowInterface {
  id: number;
  name: string;
  roles: RoleRowInterface[];
  // 扩展属性
  idEdit?: boolean;
}

export interface SystemUserCaredInterface {
  name: string;
  roleIds: number[];
}

export interface SystemUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

/**
 * 模块名: 列表
 */
export const systemUserList = (params: systemUserList) =>
  http.get<ReturnListInterface<SystemUserRowInterface[]>>('/system-user?' + qs.stringify(params));

/**
 * 模块名: 更新
 */
export const systemUserUpData = (id: number, roleIds: number[]) =>
  http.patch<SystemUserRowInterface>(`/system-user/${id}`, { roleIds });

/**
 * 模块名: 创建
 */
export const systemUserCreated = (data: SystemUserCaredInterface) =>
  http.post<SystemUserRowInterface>('/system-user', data);

/**
 * 模块名: 修改密码
 */
export const systemUserChangePassword = (id: number, data: SystemUserChangePassword) =>
  http.patch<SystemUserRowInterface>(`/system-user/changePassword/${id}`, data);
