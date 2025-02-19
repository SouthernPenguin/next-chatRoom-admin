import qs from 'qs';
import { http } from '../utils/server';
import { IReturnList, ISearchPageInterface } from '../types/publiceType.ts';
import { IRoleRowInterface } from './roles';

interface ISystemUserList extends ISearchPageInterface {
  name?: string;
}

export interface ISystemUserRow {
  id: number;
  name: string;
  roles: IRoleRowInterface[];
  // 扩展属性
  idEdit?: boolean;
}

export interface ISystemUserCared {
  name: string;
  roleIds: number[];
}

export interface ISystemUserChangePassword {
  oldPassword: string;
  newPassword: string;
}

/**
 * 模块名: 列表
 */
export const ISystemUserList = (params: ISystemUserList) =>
  http.get<IReturnList<ISystemUserRow[]>>('/system-user?' + qs.stringify(params));

/**
 * 模块名: 更新
 */
export const systemUserUpData = (id: number, roleIds: number[]) =>
  http.patch<ISystemUserRow>(`/system-user/${id}`, { roleIds });

/**
 * 模块名: 创建
 */
export const systemUserCreated = (data: ISystemUserCared) => http.post<ISystemUserRow>('/system-user', data);

/**
 * 模块名: 修改密码
 */
export const systemUserChangePassword = (id: number, data: ISystemUserChangePassword) =>
  http.patch<ISystemUserRow>(`/system-user/changePassword/${id}`, data);
