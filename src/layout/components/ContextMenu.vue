<template>
  <ul class="context-menu-container">
    <li @click="tagsClose(ContextmenuClose.ALL)">关闭全部</li>
    <li @click="tagsClose(ContextmenuClose.LEFT)">关闭左侧</li>
    <li @click="tagsClose(ContextmenuClose.RIGHT)">关闭右侧</li>
    <li @click="tagsClose(ContextmenuClose.OTHER)">关闭其他</li>
  </ul>
</template>

<script setup lang="ts">
import { ContextmenuClose, useMenuRouterStore } from '../../stores/menu';

const menuRouterStore = useMenuRouterStore();

const tagsClose = (type: ContextmenuClose) => {
  menuRouterStore.tagsMove(type);
};
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
