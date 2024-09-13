<template>
  <div id="navbar">
    <div class="header">
      <div class="header-left">
        <div class="breadcrumb">
          <el-icon v-if="styleStore.isCollapse"><Expand @click="styleStore.collapse" /></el-icon>
          <el-icon v-else><Fold @click="styleStore.collapse" /></el-icon>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" style="margin-left: 10px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

            <el-breadcrumb-item v-for="item in breadcrumb" :key="item">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="header-right">
        <!-- 头像 -->
        <div class="icons">
          <Screenfull />
        </div>

        <el-avatar shape="square" style="margin-right: 10px" />

        <el-dropdown :hide-on-click="false">
          <span style="cursor: pointer">
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <el-scrollbar style="border-top: 1px solid #9093997d; box-shadow: rgb(0 0 0 / 43%) 0px 2px 3px 0px">
      <div class="tags">
        <el-tag
          effect="dark"
          @contextmenu.prevent="openMenu($event, index)"
          @close.prevent.stop="moveTag(index)"
          @click.prevent.stop="toTag(tag, index)"
          v-for="(tag, index) in tags"
          :key="tag.path"
          :closable="index !== 0"
          style="cursor: pointer"
          :type="index === tagIndex ? 'success' : 'primary'"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </el-scrollbar>

    <ContextMenu
      :style="{
        top: menuStyle.top,
        left: menuStyle.left,
      }"
      v-show="isContextmenuShow"
    />
  </div>
</template>
<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

import ContextMenu from './ContextMenu.vue';
import Screenfull from './Screenfull.vue';

import { useStyleStore } from '@/stores/styleStore';
import { useLoginUser } from '@/stores/user';
import { TTags, useMenuRouterStore } from '../../stores/menu';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue';

const styleStore = useStyleStore();
const userStore = useLoginUser();
const menuRouterStore = useMenuRouterStore();
const router = useRouter();

const { tags, tagIndex, breadcrumb } = storeToRefs(menuRouterStore);

const menuStyle = reactive<{ left: string; top: string }>({
  left: '0px',
  top: '0px',
});
const isContextmenuShow = ref<boolean>(false);

const closeMenu = () => {
  isContextmenuShow.value = false;
};

watch(isContextmenuShow, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});

const moveTag = (index: number) => {
  menuRouterStore.moveRouters(index);
  router.push(tags.value[tags.value.length - 1].path);
};

const toTag = (item: TTags, index: number) => {
  menuRouterStore.tagIndex = index;
  menuRouterStore.defaultActive = item.path;
  router.push(item.path);
};

const openMenu = (e: MouseEvent, index: number) => {
  const { x, y } = e;
  menuStyle.left = x + 'px';
  menuStyle.top = y + 'px';
  menuRouterStore.moveIndex = index;
  isContextmenuShow.value = true;
};

const loginOut = () => {
  userStore.loginOut();
};
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
#navbar {
  .header {
    height: 50px;
    box-sizing: border-box;
    overflow: hidden;
    @include flex;
    padding: 0 5px;
    .header-left {
      font-size: 25px;
      .breadcrumb {
        display: flex;
        align-items: center;
      }
    }
    .header-right {
      .icons {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 25px;
        margin-right: 10px;
      }
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
