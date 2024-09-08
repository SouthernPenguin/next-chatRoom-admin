import { http } from '../utils/server';

export function login(data: { name: string; password: string }) {
  return http.post<{
    name: string;
    password: string;
    roleIds: string[];
  }>('/auth/auth/login', data);
}

export default { login };
