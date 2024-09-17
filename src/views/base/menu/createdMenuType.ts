import { menuType } from '../../../api/auth';

export interface ICreatedMenu extends Omit<menuType, 'isDeleted' | 'children'> {}
