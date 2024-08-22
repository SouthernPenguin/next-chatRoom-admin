<template>
  <div id="navbar">
    <div class="header">
      <div class="header-left">
        <div>
          <el-icon v-if="mainStore.isCollapse"><Expand @click="mainStore.collapse" /></el-icon>
          <el-icon v-else><Fold @click="mainStore.collapse" /></el-icon>
        </div>
      </div>
      <div class="header-right">
        <el-avatar shape="square" :src="squareUrl" style="margin-right: 10px" />

        <el-dropdown :hide-on-click="false">
          <span style="cursor: pointer">
            Admin {{ mainStore.isCollapse }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
              <el-dropdown-item divided>Action 6</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <el-scrollbar style="border-top: 1px solid #9093997d; box-shadow: rgb(0 0 0 / 43%) 0px 2px 3px 0px">
      <div class="tags">
        <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
          {{ tag.name }}
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
import { reactive, ref, toRefs } from 'vue';

import { useStyleStore } from '@/store/styleStore';
const mainStore = useStyleStore();

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
});

const { circleUrl, squareUrl, sizeList } = toRefs(state);

import type { TagProps } from 'element-plus';
interface TagsItem {
  name: string;
  type: TagProps['type'];
}

const tags = ref<TagsItem[]>([
  { name: 'Tag 1', type: 'primary' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 4', type: 'warning' },
  { name: 'Tag 5', type: 'danger' },
  { name: 'Tag 6', type: 'primary' },
  { name: 'Tag 7', type: 'success' },
  { name: 'Tag 8', type: 'info' },
  { name: 'Tag 9', type: 'warning' },
  { name: 'Tag 10', type: 'danger' },
  { name: 'Tag 11', type: 'primary' },
  { name: 'Tag 12', type: 'success' },
  { name: 'Tag 13', type: 'info' },
  { name: 'Tag 14', type: 'warning' },
  { name: 'Tag 15', type: 'danger' },
  { name: 'Tag 16', type: 'primary' },
  { name: 'Tag 17', type: 'success' },
  { name: 'Tag 18', type: 'info' },
  { name: 'Tag 19', type: 'warning' },
  { name: 'Tag 20', type: 'danger' },
  { name: 'Tag 21', type: 'primary' },
  { name: 'Tag 22', type: 'success' },
  { name: 'Tag 23', type: 'info' },
  { name: 'Tag 24', type: 'warning' },
  { name: 'Tag 25', type: 'danger' },
  { name: 'Tag 26', type: 'primary' },
  { name: 'Tag 27', type: 'success' },
  { name: 'Tag 28', type: 'info' },
  { name: 'Tag 29', type: 'warning' },
  { name: 'Tag 30', type: 'danger' },
]);
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
#navbar {
  // background-color: skyblue;

  .header {
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    @include flex;
    padding: 0 5px;
    .header-left {
      font-size: 25px;
    }
    .header-right {
      @include flex;
    }
  }
  .tags {
    box-sizing: border-box;
    padding: 0 5px;
    height: 35px;
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
    }
  }
}
</style>
