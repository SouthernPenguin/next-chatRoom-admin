<template>
  <el-scrollbar>
    <el-menu
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
import { storeToRefs } from 'pinia';
import { useStyleStore } from '@/stores/styleStore';
import { MenuItemClicked } from 'element-plus/es/components/menu';

import MenuItems from './Menu/MenuItem.vue';
import { useRouter } from 'vue-router';
import { useLoginUser } from '../../stores/user';

const mainStore = useStyleStore();
const loginUser = useLoginUser();
const router = useRouter();
const { isCollapse } = storeToRefs(mainStore);
const { menus } = storeToRefs(loginUser);

const selectMenuItem = (index: string, indexPath: string[], item: MenuItemClicked) => {
  router.push(item.index);
};
</script>
