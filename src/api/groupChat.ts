import qs from 'qs';
import { http } from '../utils/server';
import { IReturnList, ISearchPageInterface } from '../types/publiceType';
import { IGroupChatList } from '../types/grouChat';
import { IUser } from '../types/user';

export const getGroupList = (query: ISearchPageInterface) =>
  http.get<IReturnList<IGroupChatList[]>>('/group-chat-admin?' + qs.stringify(query));

export const groupUserList = (id: number) => http.get<IUser[]>(`/group-chat-admin/${id}`);

export const groupDel = (id: number) => http.delete(`/group-chat-admin/${id}`);
