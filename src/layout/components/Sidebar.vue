<template>
  <el-scrollbar style="background-color: red">
    <el-menu
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <MenuItems :key="item.path" :node="item" v-for="item in routers" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useStyleStore } from '@/store/styleStore';
import MenuItems from './Menu/MenuItem.vue';

const routers = [
  {
    name: 'OA管理',
    path: '/OA',
    hidden: false,
    component: 'Layout',
    meta: {
      title: 'OA管理',
      icon: 'peoples',
      noCache: true,
    },
    create: false,
    children: [
      {
        name: '通知公告',
        path: 'notice',
        pid: '1428534433607327745',
        hidden: false,
        component: 'OA/notice/index',
        meta: {
          title: '通知公告',
          icon: 'money',
          noCache: true,
        },
        create: false,
      },
      {
        name: '文件管理',
        path: 'fileManager',
        pid: '1428534433607327745',
        hidden: false,
        component: 'OA/fileManager/index',
        meta: {
          title: '文件管理',
          icon: 'nested',
          noCache: true,
        },
        create: false,
      },
      {
        name: '行政办公',
        path: 'administeration',
        pid: '1428534433607327745',
        hidden: false,
        component: 'OA/Administeration/index',
        meta: {
          title: '行政办公',
          icon: 'menu',
          noCache: false,
        },
        create: false,
      },
    ],
  },
];
const mainStore = useStyleStore();
const { isCollapse } = storeToRefs(mainStore);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
