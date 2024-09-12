import { defineStore } from 'pinia';

export const useStyleStore = defineStore('styleStore', {
  state: () => ({ isCollapse: false }),
  getters: {
    double: state => state.isCollapse,
  },
  actions: {
    collapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
});
