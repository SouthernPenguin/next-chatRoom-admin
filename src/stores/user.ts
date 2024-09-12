import { defineStore } from 'pinia';
import { allLocalStorageMove, setLocalStorageToken } from '../utils';
import router from '../router';

export type RolesTypes = {
  id: number;
  name: string;
};

interface IUserInfo {
  id: number | null;
  name: string | null;
  roles?: RolesTypes[];
}

export interface UseLoginUser {
  userInfo?: IUserInfo;
  isLoadingMenu?: Boolean;
  menus?: any[];
}

export const useLoginUser = defineStore('loginUser', {
  state: (): UseLoginUser => {
    return { userInfo: { id: null, name: null }, isLoadingMenu: false, menus: [] };
  },
  getters: {
    returnUserInfo: state => state.userInfo,
  },
  actions: {
    loginOut() {
      allLocalStorageMove();
      router.push('/login');
    },
    setUserInfo(userInfo: IUserInfo, token: string) {
      this.userInfo = userInfo;
      setLocalStorageToken(token);
    },
  },
  persist: {
    key: '__userInfo__',
    storage: localStorage,
    paths: ['userInfo'],
  },
});
