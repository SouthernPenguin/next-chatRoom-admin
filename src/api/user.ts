import qs from 'qs';
import { http } from '../utils/server';
import { IUser, IUserSearch } from '../types/user.ts';
import { IReturnList } from '../types/publiceType.ts';

/**
 * 用户列表
 * @param query
 * @returns
 */
export const getUserList = (query: IUserSearch) =>
  http.get<IReturnList<IUser[]>>(`/user?${qs.stringify({ ...query })}`);

/**
 * 重置用户密码
 * @param userId
 * @returns
 */
export const resetPassword = (userId: number) => http.get<IUser>('/user/resetPassword/' + userId);

/**
 * 用户拉暗黑
 * @param userId
 * @returns
 */
export const black = (userId: number) => http.get<IUser>('/user/black/' + userId);

/**
 * 用户创建
 * @param systemUserUpData
 * @returns
 */
export const createUser = (data: IUser) => http.post<IUser>(`/auth/register`, data);

/**
 * 用户更新
 * @param data
 * @param id
 * @returns
 */
export const upUser = (data: IUser, id: number) => http.patch<IUser>(`/user/${id}`, data);

/**
 * 用户头像上传
 */
export const sysytenUserUpLoadUserImage = `${import.meta.env.VITE_APP_URL}/api/upload/sysytenUserUpLoadUserImage`;
