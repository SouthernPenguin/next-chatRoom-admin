import { ISearchPageInterface } from './publiceType.ts';

export interface IUser {
  id: number;
  name: string;
  nickname: string | null;
  headerImg: string | undefined;
  gender: number | null;
  isBlack: boolean;
  password?: string | null;
}
export interface IUserSearch extends ISearchPageInterface {
  blur: string;
}
