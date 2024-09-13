import { defineStore } from 'pinia';
import router from '../router';

export type TTags = { path: string; name: string };
export enum ContextmenuClose {
  ALL = 'ALL',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  OTHER = 'OTHER',
}

export interface UseMenuRouter {
  tags: TTags[];
  tagIndex: number;
  defaultActive: string;
  breadcrumb: string[] | null;
  moveIndex: number;
}

export const useMenuRouterStore = defineStore('menuRouterStore', {
  state: (): UseMenuRouter => {
    return {
      tags: [{ path: '/home', name: '首页' }],
      tagIndex: 0,
      defaultActive: '/home',
      breadcrumb: [],
      moveIndex: -1,
    };
  },
  getters: {},
  actions: {
    returnTagsIndex() {
      return this.tags.length - 1;
    },
    addRouters(item: TTags) {
      this.defaultActive = item.path;
      if (this.tags.some(s => s.path === item.path)) {
        const tagsIndex = this.tags.findIndex(fIndex => fIndex.path === item.path);
        if (tagsIndex) {
          this.tagIndex = tagsIndex;
        }
        return;
      }
      this.tags.push(item);
      this.tagIndex = this.returnTagsIndex();
    },
    moveRouters(index: number) {
      this.tags.splice(index, 1);
      this.tagIndex = this.returnTagsIndex();
    },
    tagsMove(type: ContextmenuClose) {
      if (type === 'ALL') {
        this.tags.splice(1, this.tags.length - 1);
        router.push({ path: '/home' });
        return;
      }

      if (type === 'LEFT') {
        if (this.moveIndex === 1) return;
        const copy: TTags = JSON.parse(JSON.stringify(this.tags[this.moveIndex]));
        this.tags.splice(1, this.moveIndex - 1);
        const tagIndex = this.tags.findIndex(item => item.path === router.currentRoute.value.path);

        if (tagIndex > -1) {
          this.tagIndex = tagIndex;
        } else {
          this.tagIndex = this.tags.findIndex(item => item.path === copy.path);
          router.push({ path: copy.path });
        }
        return;
      }

      if (type === 'RIGHT') {
        const copy: TTags = JSON.parse(JSON.stringify(this.tags[this.moveIndex]));
        this.tags.splice(this.moveIndex + 1, this.tags.length - 1);
        const tagIndex = this.tags.findIndex(item => item.path === router.currentRoute.value.path);

        if (tagIndex > -1) {
          this.tagIndex = tagIndex;
        } else {
          this.tagIndex = this.tags.findIndex(item => item.path === copy.path);
          router.push({ path: copy.path });
        }
        return;
      }

      if (type === 'OTHER') {
        const newTags = this.tags.filter(item => item.path === this.tags[this.moveIndex].path || item.path === '/home');
        this.tags = newTags;
        this.tagIndex = this.tags.length;
        router.push({ path: this.tags[this.tags.length - 1].path });
      }
    },
  },
});
