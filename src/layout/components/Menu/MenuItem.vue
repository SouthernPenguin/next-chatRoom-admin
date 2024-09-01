<template>
  <el-sub-menu :index="props.node.path" v-if="props.node.children && props.node.children.length">
    <template #title>{{ props.node.name }}</template>
    <MenuItems v-for="childItem in props.node.children" :key="childItem.component" :node="childItem"></MenuItems>
  </el-sub-menu>

  <el-menu-item :index="props.node.path" v-else>
    <el-icon><location /></el-icon>
    <template #title>{{ props.node.name }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { defineOptions, defineProps, toRefs } from 'vue';
defineOptions({
  name: 'MenuItems',
});
interface NodeType {
  name: string;
  path: string;
  hidden: boolean;
  component: string;
  pid?: string;
  meta: {
    title: string;
    icon: string;
    noCache: boolean;
  };
  create: boolean;
  children?: NodeType[];
}

interface PropsInterface {
  node: NodeType;
}

const props = defineProps<PropsInterface>();
</script>

<style lang="scss" scoped></style>
