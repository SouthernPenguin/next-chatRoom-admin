<template>
  <el-scrollbar>
    <el-menu
      :default-active="menuRouterStore.defaultActive"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      router
      :unique-opened="true"
      text-color="#fff"
      @select="selectMenuItem"
    >
      <el-menu-item index="/home">
        <el-icon><House /></el-icon>
        <template #title>首页</template>
      </el-menu-item>

      <MenuItems :key="item.path" :node="item" v-for="item in menus" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { MenuItemClicked } from 'element-plus/es/components/menu';

import MenuItems from './Menu/MenuItem.vue';
import { useRouter } from 'vue-router';
import { useLoginUser } from '../../stores/user';
import { useMenuRouterStore } from '../../stores/menu';
import { useStyleStore } from '../../stores/styleStore';

const menuRouterStore = useMenuRouterStore();
const mainStore = useStyleStore();
const loginUser = useLoginUser();
const router = useRouter();
const { isCollapse } = storeToRefs(mainStore);
const { menus } = storeToRefs(loginUser);

watch(
  () => router.currentRoute.value,
  value => {
    menuRouterStore.addRouters({
      path: router.currentRoute.value.path as string,
      name: router.currentRoute.value.name as string,
    });
    if (value.name !== 'home') {
      menuRouterStore.breadcrumb = value.matched.map(item => item.name) as string[];
    } else {
      menuRouterStore.breadcrumb = [];
    }
  },
  { immediate: true, deep: true }
);

const selectMenuItem = (index: string, indexPath: string[], item: MenuItemClicked) => {
  router.push(item.index);
};
</script>
