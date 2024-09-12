<template>
  <el-scrollbar>
    <router-view />
  </el-scrollbar>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box1 {
  height: 500px;
}

.box2 {
  height: 500px;
  position: relative;
  .box3 {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
