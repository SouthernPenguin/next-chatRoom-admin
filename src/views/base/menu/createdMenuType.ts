import { TMenuType } from '../../../api/auth';

export interface ICreatedMenu extends Omit<TMenuType, 'isDeleted' | 'children'> {}
